from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

# Import our models
from models import (
    ContactMessage, ContactMessageCreate, ContactResponse,
    AdminLogin, AdminToken, PortfolioSection, PortfolioUpdate,
    AnalyticsData, PageView
)


ROOT_DIR = Path(__file__).parent

# Load environment variables (production or development)
if os.path.exists(ROOT_DIR / '.env.production'):
    load_dotenv(ROOT_DIR / '.env.production')
else:
    load_dotenv(ROOT_DIR / '.env')

# Import services after loading environment variables
from auth import authenticate_admin, create_access_token, get_current_admin
from email_service import email_service

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running"}

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactMessageCreate, request: Request):
    try:
        # Create contact message document
        contact_message = ContactMessage(**contact_data.dict())
        
        # Save to database
        await db.contact_messages.insert_one(contact_message.dict())
        
        # Send email notifications
        email_sent = await email_service.send_contact_notification(contact_data.dict())
        auto_reply_sent = await email_service.send_auto_reply(contact_data.dict())
        
        # Track analytics
        await track_page_view("contact_submission", request)
        
        if email_sent:
            return ContactResponse(
                success=True,
                message="Thank you for your message! I'll get back to you soon."
            )
        else:
            # Even if email fails, we saved the message
            return ContactResponse(
                success=True,
                message="Your message has been received. I'll get back to you soon."
            )
            
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message. Please try again later."
        )

# Admin Authentication
@api_router.post("/admin/login", response_model=AdminToken)
async def admin_login(credentials: AdminLogin):
    if not authenticate_admin(credentials.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials"
        )
    
    access_token = create_access_token(data={"sub": "admin"})
    return AdminToken(access_token=access_token)

# Admin Dashboard Endpoints
@api_router.get("/admin/contact-messages")
async def get_contact_messages(
    skip: int = 0, 
    limit: int = 50,
    admin=Depends(get_current_admin)
):
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).skip(skip).limit(limit).to_list(limit)
        return [ContactMessage(**msg) for msg in messages]
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

@api_router.put("/admin/contact-messages/{message_id}/read")
async def mark_message_read(message_id: str, admin=Depends(get_current_admin)):
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"read": True}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")
        return {"success": True, "message": "Message marked as read"}
    except Exception as e:
        logger.error(f"Error marking message as read: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update message")

@api_router.get("/admin/analytics", response_model=AnalyticsData)
async def get_analytics(admin=Depends(get_current_admin)):
    try:
        # Get contact form statistics
        total_messages = await db.contact_messages.count_documents({})
        unread_messages = await db.contact_messages.count_documents({"read": False})
        
        # Get page views
        page_views = await db.page_views.count_documents({})
        
        # Get last contact timestamp
        last_contact_doc = await db.contact_messages.find().sort("timestamp", -1).limit(1).to_list(1)
        last_contact = last_contact_doc[0]["timestamp"] if last_contact_doc else None
        
        return AnalyticsData(
            page_views=page_views,
            contact_submissions=total_messages,
            total_messages=total_messages,
            unread_messages=unread_messages,
            last_contact=last_contact
        )
    except Exception as e:
        logger.error(f"Error fetching analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch analytics")

# Portfolio Management
@api_router.get("/admin/portfolio")
async def get_portfolio_data(admin=Depends(get_current_admin)):
    try:
        portfolio_data = await db.portfolio_sections.find().to_list(100)
        return [PortfolioSection(**section) for section in portfolio_data]
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch portfolio data")

@api_router.put("/admin/portfolio")
async def update_portfolio_section(
    portfolio_update: PortfolioUpdate,
    admin=Depends(get_current_admin)
):
    try:
        section_data = PortfolioSection(**portfolio_update.dict())
        
        result = await db.portfolio_sections.update_one(
            {"section_name": portfolio_update.section_name},
            {"$set": section_data.dict()},
            upsert=True
        )
        
        return {"success": True, "message": "Portfolio section updated successfully"}
    except Exception as e:
        logger.error(f"Error updating portfolio section: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update portfolio section")

# Analytics tracking helper
async def track_page_view(page: str, request: Request):
    try:
        page_view = PageView(
            page=page,
            user_agent=request.headers.get("user-agent"),
            ip_address=request.client.host if request.client else None
        )
        await db.page_views.insert_one(page_view.dict())
    except Exception as e:
        logger.error(f"Error tracking page view: {str(e)}")

# Page view tracking endpoint
@api_router.post("/track/page-view")
async def track_page(request: Request, page: str = "home"):
    await track_page_view(page, request)
    return {"success": True}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
