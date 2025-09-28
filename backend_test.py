#!/usr/bin/env python3
"""
Portfolio Backend API Testing Suite
Tests all backend endpoints including contact form, admin auth, and analytics
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any, Optional

# Backend URL from frontend .env
BACKEND_URL = "https://tech-portfolio-191.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.admin_token = None
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "Portfolio API is running" in data.get("message", ""):
                    self.log_test("Root Endpoint", True, "API is running correctly")
                    return True
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_submission(self):
        """Test contact form submission with valid data"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Email Test",
            "message": "Testing if emails are being sent properly"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "thank you" in data.get("message", "").lower():
                    self.log_test("Contact Form Submission", True, "Contact form submitted successfully")
                    return True
                else:
                    self.log_test("Contact Form Submission", False, f"Unexpected response format: {data}")
                    return False
            else:
                self.log_test("Contact Form Submission", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Request error: {str(e)}")
            return False
    
    def test_email_service_detailed(self):
        """Detailed test of email service functionality"""
        print("\n🔍 DETAILED EMAIL SERVICE TEST")
        print("=" * 50)
        
        # Test data as specified in the request
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Email Test",
            "message": "Testing if emails are being sent properly"
        }
        
        try:
            # Submit contact form and capture detailed response
            response = requests.post(
                f"{self.base_url}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            print(f"📤 Contact Form Response Status: {response.status_code}")
            print(f"📤 Contact Form Response Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"📤 Contact Form Response Data: {data}")
                
                if data.get("success"):
                    self.log_test("Email Service - Contact Form", True, 
                                f"Contact form accepted. Response: {data.get('message')}")
                    
                    # Wait a moment for email processing
                    time.sleep(2)
                    
                    # Check if message was saved to database by retrieving it via admin API
                    if self.admin_token:
                        self.verify_message_in_database(contact_data)
                    
                    return True
                else:
                    self.log_test("Email Service - Contact Form", False, 
                                f"Contact form failed: {data}")
                    return False
            else:
                error_text = response.text
                self.log_test("Email Service - Contact Form", False, 
                            f"HTTP {response.status_code}: {error_text}")
                return False
                
        except Exception as e:
            self.log_test("Email Service - Contact Form", False, f"Request error: {str(e)}")
            return False
    
    def verify_message_in_database(self, contact_data):
        """Verify the contact message was saved to MongoDB"""
        if not self.admin_token:
            print("⚠️  Cannot verify database storage - no admin token")
            return False
        
        headers = {
            "Authorization": f"Bearer {self.admin_token}",
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.get(
                f"{self.base_url}/admin/contact-messages",
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                messages = response.json()
                print(f"📊 Total messages in database: {len(messages)}")
                
                # Look for our test message
                test_message_found = False
                for msg in messages:
                    if (msg.get('email') == contact_data['email'] and 
                        msg.get('subject') == contact_data['subject']):
                        test_message_found = True
                        print(f"✅ Test message found in database: {msg.get('name')} - {msg.get('subject')}")
                        break
                
                if test_message_found:
                    self.log_test("Email Service - Database Storage", True, 
                                "Contact message successfully saved to MongoDB")
                    return True
                else:
                    self.log_test("Email Service - Database Storage", False, 
                                "Test message not found in database")
                    return False
            else:
                self.log_test("Email Service - Database Storage", False, 
                            f"Could not retrieve messages: HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Email Service - Database Storage", False, 
                        f"Database verification error: {str(e)}")
            return False
    
    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        invalid_data = {
            "name": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "subject": "",  # Empty subject
            "message": ""  # Empty message
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 422:  # Validation error expected
                self.log_test("Contact Form Validation", True, "Validation errors properly handled")
                return True
            else:
                self.log_test("Contact Form Validation", False, f"Expected 422, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Contact Form Validation", False, f"Request error: {str(e)}")
            return False
    
    def test_admin_login_valid(self):
        """Test admin login with valid credentials"""
        login_data = {
            "password": "admin123"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/admin/login",
                json=login_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and data.get("token_type") == "bearer":
                    self.admin_token = data["access_token"]
                    self.log_test("Admin Login (Valid)", True, "JWT token generated successfully")
                    return True
                else:
                    self.log_test("Admin Login (Valid)", False, f"Invalid token format: {data}")
                    return False
            else:
                self.log_test("Admin Login (Valid)", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Admin Login (Valid)", False, f"Request error: {str(e)}")
            return False
    
    def test_admin_login_invalid(self):
        """Test admin login with invalid credentials"""
        login_data = {
            "password": "wrongpassword"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/admin/login",
                json=login_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 401:
                self.log_test("Admin Login (Invalid)", True, "Invalid credentials properly rejected")
                return True
            else:
                self.log_test("Admin Login (Invalid)", False, f"Expected 401, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Admin Login (Invalid)", False, f"Request error: {str(e)}")
            return False
    
    def test_admin_analytics(self):
        """Test admin analytics endpoint"""
        if not self.admin_token:
            self.log_test("Admin Analytics", False, "No admin token available")
            return False
        
        headers = {
            "Authorization": f"Bearer {self.admin_token}",
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.get(
                f"{self.base_url}/admin/analytics",
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["page_views", "contact_submissions", "total_messages", "unread_messages"]
                if all(field in data for field in required_fields):
                    self.log_test("Admin Analytics", True, f"Analytics data retrieved: {data}")
                    return True
                else:
                    self.log_test("Admin Analytics", False, f"Missing required fields in response: {data}")
                    return False
            else:
                self.log_test("Admin Analytics", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Admin Analytics", False, f"Request error: {str(e)}")
            return False
    
    def test_admin_contact_messages(self):
        """Test admin contact messages endpoint"""
        if not self.admin_token:
            self.log_test("Admin Contact Messages", False, "No admin token available")
            return False
        
        headers = {
            "Authorization": f"Bearer {self.admin_token}",
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.get(
                f"{self.base_url}/admin/contact-messages",
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Admin Contact Messages", True, f"Retrieved {len(data)} contact messages")
                    return True
                else:
                    self.log_test("Admin Contact Messages", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Admin Contact Messages", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Admin Contact Messages", False, f"Request error: {str(e)}")
            return False
    
    def test_mark_message_read(self):
        """Test marking a message as read"""
        if not self.admin_token:
            self.log_test("Mark Message Read", False, "No admin token available")
            return False
        
        # First get messages to find one to mark as read
        headers = {
            "Authorization": f"Bearer {self.admin_token}",
            "Content-Type": "application/json"
        }
        
        try:
            # Get messages first
            response = requests.get(
                f"{self.base_url}/admin/contact-messages",
                headers=headers,
                timeout=10
            )
            
            if response.status_code != 200:
                self.log_test("Mark Message Read", False, "Could not retrieve messages to test")
                return False
            
            messages = response.json()
            if not messages:
                self.log_test("Mark Message Read", True, "No messages to mark as read (expected)")
                return True
            
            # Try to mark the first message as read
            message_id = messages[0].get("id")
            if not message_id:
                self.log_test("Mark Message Read", False, "Message ID not found in response")
                return False
            
            mark_read_response = requests.put(
                f"{self.base_url}/admin/contact-messages/{message_id}/read",
                headers=headers,
                timeout=10
            )
            
            if mark_read_response.status_code == 200:
                data = mark_read_response.json()
                if data.get("success"):
                    self.log_test("Mark Message Read", True, "Message marked as read successfully")
                    return True
                else:
                    self.log_test("Mark Message Read", False, f"Unexpected response: {data}")
                    return False
            elif mark_read_response.status_code == 404:
                self.log_test("Mark Message Read", True, "Message not found (acceptable for test)")
                return True
            else:
                self.log_test("Mark Message Read", False, f"HTTP {mark_read_response.status_code}: {mark_read_response.text}")
                return False
                
        except Exception as e:
            self.log_test("Mark Message Read", False, f"Request error: {str(e)}")
            return False
    
    def test_unauthorized_access(self):
        """Test that admin endpoints reject unauthorized access"""
        try:
            # Test analytics without token
            response = requests.get(f"{self.base_url}/admin/analytics", timeout=10)
            
            if response.status_code == 401 or response.status_code == 403:
                self.log_test("Unauthorized Access", True, "Admin endpoints properly protected")
                return True
            else:
                self.log_test("Unauthorized Access", False, f"Expected 401/403, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Unauthorized Access", False, f"Request error: {str(e)}")
            return False
    
    def test_page_view_tracking(self):
        """Test page view tracking endpoint"""
        try:
            response = requests.post(
                f"{self.base_url}/track/page-view?page=home",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Page View Tracking", True, "Page view tracked successfully")
                    return True
                else:
                    self.log_test("Page View Tracking", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Page View Tracking", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Page View Tracking", False, f"Request error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print(f"🚀 Starting Portfolio Backend API Tests")
        print(f"📍 Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence
        tests = [
            self.test_root_endpoint,
            self.test_admin_login_valid,  # Login first to get token for database verification
            self.test_email_service_detailed,  # Detailed email service test
            self.test_contact_form_submission,
            self.test_contact_form_validation,
            self.test_admin_login_invalid,
            self.test_admin_analytics,
            self.test_admin_contact_messages,
            self.test_mark_message_read,
            self.test_unauthorized_access,
            self.test_page_view_tracking
        ]
        
        passed = 0
        failed = 0
        
        for test in tests:
            try:
                if test():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"❌ FAIL {test.__name__}: Unexpected error: {str(e)}")
                failed += 1
            
            time.sleep(0.5)  # Small delay between tests
        
        print("=" * 60)
        print(f"📊 Test Results: {passed} passed, {failed} failed")
        
        if failed > 0:
            print("\n🔍 Failed Tests Details:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   • {result['test']}: {result['details']}")
        
        return failed == 0

def main():
    """Main test execution"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend API is working correctly.")
    else:
        print("\n⚠️  Some tests failed. Check the details above.")
    
    return success

if __name__ == "__main__":
    main()