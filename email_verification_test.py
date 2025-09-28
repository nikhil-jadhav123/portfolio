#!/usr/bin/env python3
"""
Email Service Verification Test
Tests the Sendinblue API integration directly
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/backend/.env')

def test_sendinblue_api_directly():
    """Test Sendinblue API directly to verify email service"""
    api_key = os.environ.get('SENDINBLUE_API_KEY')
    admin_email = os.environ.get('ADMIN_EMAIL')
    
    if not api_key:
        print("❌ SENDINBLUE_API_KEY not found in environment")
        return False
    
    if not admin_email:
        print("❌ ADMIN_EMAIL not found in environment")
        return False
    
    print(f"🔑 API Key: {api_key[:20]}...")
    print(f"📧 Admin Email: {admin_email}")
    
    # Test API connection
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': api_key
    }
    
    try:
        # Test account info endpoint
        response = requests.get(
            'https://api.sendinblue.com/v3/account',
            headers=headers,
            timeout=10
        )
        
        print(f"📊 Account API Response: {response.status_code}")
        if response.status_code == 200:
            account_data = response.json()
            print(f"✅ Sendinblue Account: {account_data.get('firstName', 'N/A')} {account_data.get('lastName', 'N/A')}")
            print(f"📧 Account Email: {account_data.get('email', 'N/A')}")
            return True
        else:
            print(f"❌ Account API Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ API Connection Error: {str(e)}")
        return False

def test_email_sending_capability():
    """Test if we can send emails via Sendinblue API"""
    api_key = os.environ.get('SENDINBLUE_API_KEY')
    admin_email = os.environ.get('ADMIN_EMAIL')
    
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': api_key
    }
    
    # Test email data
    test_email_data = {
        "sender": {
            "name": "Portfolio Test",
            "email": "noreply@portfolio.com"
        },
        "to": [
            {
                "email": admin_email,
                "name": "Test Recipient"
            }
        ],
        "subject": "Email Service Test - Contact Form Verification",
        "htmlContent": """
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #06b6d4;">Email Service Test</h2>
            <p>This is a test email to verify that the contact form email functionality is working correctly.</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Test Details:</strong></p>
                <ul>
                    <li>Contact form submission: ✅ Working</li>
                    <li>Database storage: ✅ Working</li>
                    <li>Email API integration: ✅ Working</li>
                </ul>
            </div>
            <p style="color: #666; font-size: 14px;">This is a test message from the portfolio contact form verification system.</p>
        </div>
        """
    }
    
    try:
        response = requests.post(
            'https://api.sendinblue.com/v3/smtp/email',
            headers=headers,
            json=test_email_data,
            timeout=15
        )
        
        print(f"📤 Email Send Response: {response.status_code}")
        print(f"📤 Response Headers: {dict(response.headers)}")
        
        if response.status_code == 201:
            response_data = response.json()
            print(f"✅ Email sent successfully!")
            print(f"📧 Message ID: {response_data.get('messageId', 'N/A')}")
            return True
        else:
            print(f"❌ Email Send Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Email Send Exception: {str(e)}")
        return False

def main():
    """Main test execution"""
    print("🔍 SENDINBLUE EMAIL SERVICE VERIFICATION")
    print("=" * 50)
    
    # Test 1: API Connection
    print("\n1. Testing Sendinblue API Connection...")
    api_test = test_sendinblue_api_directly()
    
    # Test 2: Email Sending
    print("\n2. Testing Email Sending Capability...")
    email_test = test_email_sending_capability()
    
    print("\n" + "=" * 50)
    print("📊 VERIFICATION RESULTS:")
    print(f"   API Connection: {'✅ PASS' if api_test else '❌ FAIL'}")
    print(f"   Email Sending: {'✅ PASS' if email_test else '❌ FAIL'}")
    
    if api_test and email_test:
        print("\n🎉 Email service is working correctly!")
        print(f"📧 Emails should be delivered to: {os.environ.get('ADMIN_EMAIL')}")
    else:
        print("\n⚠️  Email service has issues that need investigation.")
    
    return api_test and email_test

if __name__ == "__main__":
    main()