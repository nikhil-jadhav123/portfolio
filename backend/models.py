from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Contact Form Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False
    replied: bool = False

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactResponse(BaseModel):
    success: bool
    message: str

# Admin Models
class AdminLogin(BaseModel):
    password: str

class AdminToken(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Portfolio Data Models
class PortfolioSection(BaseModel):
    section_name: str
    content: dict
    last_updated: datetime = Field(default_factory=datetime.utcnow)

class PortfolioUpdate(BaseModel):
    section_name: str
    content: dict

# Analytics Models
class AnalyticsData(BaseModel):
    page_views: int = 0
    contact_submissions: int = 0
    total_messages: int = 0
    unread_messages: int = 0
    last_contact: Optional[datetime] = None

class PageView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    page: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None