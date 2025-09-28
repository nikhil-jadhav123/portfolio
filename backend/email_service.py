import os
import requests
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.api_key = os.environ.get('SENDINBLUE_API_KEY')
        self.base_url = 'https://api.sendinblue.com/v3'
        self.admin_email = os.environ.get('ADMIN_EMAIL')
        
        if not self.api_key:
            logger.error("SENDINBLUE_API_KEY not found in environment variables")
            raise ValueError("Email service API key not configured")
    
    def _get_headers(self) -> Dict[str, str]:
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': self.api_key
        }
    
    async def send_contact_notification(self, contact_data: Dict[str, Any]) -> bool:
        """Send email notification to admin when contact form is submitted"""
        try:
            # Email to admin notification
            admin_email_data = {
                "sender": {
                    "name": "Portfolio Contact Form",
                    "email": self.admin_email
                },
                "to": [
                    {
                        "email": self.admin_email,
                        "name": "Nikhil Jadhav"
                    }
                ],
                "subject": f"New Contact Form Submission: {contact_data['subject']}",
                "htmlContent": f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #06b6d4;">New Contact Form Submission</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> {contact_data['name']}</p>
                        <p><strong>Email:</strong> {contact_data['email']}</p>
                        <p><strong>Subject:</strong> {contact_data['subject']}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #06b6d4;">
                            {contact_data['message'].replace(chr(10), '<br>')}
                        </div>
                    </div>
                    <p style="color: #666; font-size: 14px;">This message was sent from your portfolio contact form.</p>
                </div>
                """
            }
            
            response = requests.post(
                f"{self.base_url}/smtp/email",
                headers=self._get_headers(),
                json=admin_email_data,
                timeout=10
            )
            
            if response.status_code == 201:
                response_data = response.json() if response.content else {}
                message_id = response_data.get('messageId', 'N/A')
                logger.info(f"✅ Admin notification sent successfully to {self.admin_email} - MessageID: {message_id}")
                logger.info(f"📧 Email subject: {contact_data['subject']} from {contact_data['name']} ({contact_data['email']})")
                return True
            else:
                logger.error(f"❌ Failed to send admin notification: {response.status_code} - {response.text}")
                logger.error(f"📧 Failed email data: {admin_email_data}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending contact notification: {str(e)}")
            return False
    
    async def send_auto_reply(self, contact_data: Dict[str, Any]) -> bool:
        """Send auto-reply to contact form submitter"""
        try:
            auto_reply_data = {
                "sender": {
                    "name": "Nikhil Jadhav",
                    "email": self.admin_email
                },
                "to": [
                    {
                        "email": contact_data['email'],
                        "name": contact_data['name']
                    }
                ],
                "subject": f"Thank you for contacting me - Re: {contact_data['subject']}",
                "htmlContent": f"""
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #06b6d4;">Thank you for reaching out!</h2>
                    <p>Hi {contact_data['name']},</p>
                    <p>Thank you for your message regarding "{contact_data['subject']}". I have received your inquiry and will get back to you within 24-48 hours.</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
                        <p style="color: #666; font-style: italic;">"{contact_data['message']}"</p>
                    </div>
                    
                    <p>In the meantime, feel free to:</p>
                    <ul>
                        <li>Connect with me on <a href="https://www.linkedin.com/in/nikhil-n-jadhav07/" style="color: #06b6d4;">LinkedIn</a></li>
                        <li>Check out my projects on <a href="https://github.com/nikhil-jadhav123" style="color: #06b6d4;">GitHub</a></li>
                        <li>Download my <a href="#" style="color: #06b6d4;">resume</a> for more details</li>
                    </ul>
                    
                    <p>Best regards,<br>
                    <strong>Nikhil Jadhav</strong><br>
                    Data Engineer & Azure Cloud Specialist</p>
                    
                    <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999;">
                        <p>This is an automated response. Please do not reply to this email.</p>
                    </div>
                </div>
                """
            }
            
            response = requests.post(
                f"{self.base_url}/smtp/email",
                headers=self._get_headers(),
                json=auto_reply_data,
                timeout=10
            )
            
            if response.status_code == 201:
                logger.info(f"Auto-reply sent successfully to {contact_data['email']}")
                return True
            else:
                logger.error(f"Failed to send auto-reply: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending auto-reply: {str(e)}")
            return False

# Global email service instance
email_service = EmailService()