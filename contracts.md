# Portfolio Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for Nikhil's portfolio website backend functionality.

## Current Frontend Mock Data
- Contact form submission (currently shows toast notification)
- All portfolio data is hardcoded in components

## Backend Implementation Plan

### 1. Contact Form API
**Endpoint:** `POST /api/contact`
**Purpose:** Handle contact form submissions and send emails

**Request Body:**
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Integration:** 
- Remove mock toast in Contact.jsx
- Add real API call to backend
- Handle loading states and error responses

### 2. Admin Dashboard APIs

**Portfolio Data Management:**
- `GET /api/admin/portfolio` - Get all portfolio data
- `PUT /api/admin/portfolio` - Update portfolio sections
- `POST /api/admin/contact-messages` - Get contact submissions
- `GET /api/admin/analytics` - Basic analytics data

**Admin Authentication:**
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify admin session

### 3. Database Schema

**Collections:**
- `contact_messages` - Store contact form submissions
- `portfolio_data` - Store editable portfolio content  
- `admin_users` - Admin authentication
- `analytics` - Track page views, contact submissions

### 4. Email Service Integration
- Use provided Sendinblue API key for email notifications
- Send contact form submissions to admin email
- Auto-reply to contact form submitters

### 5. Frontend Integration Changes

**Contact Form (Contact.jsx):**
- Replace mock toast with real API call
- Add loading spinner during submission
- Show success/error messages from backend

**Admin Dashboard (New):**
- Create protected admin routes
- Content management interface
- Contact message inbox
- Basic analytics dashboard

## Environment Variables Needed
- `SENDINBLUE_API_KEY` - For email service
- `ADMIN_EMAIL` - Recipient for contact forms
- `JWT_SECRET` - For admin authentication
- `ADMIN_PASSWORD` - Default admin password

## Security Considerations
- Input validation and sanitization
- Rate limiting on contact form
- JWT tokens for admin authentication
- CORS configuration for production