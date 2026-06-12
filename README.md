# Smart Asset Management Platform

A full-stack web application for managing institutional assets, handling asset requests, tracking allocations, monitoring inventory, generating analytics, and performing QR-based asset operations.

The platform provides secure role-based access control for administrators and users while maintaining transparency through notifications and audit logs.

---

## Project Overview

The Smart Asset Management Platform is designed to streamline the complete asset lifecycle within educational institutions and organizations.

The system enables:

- Asset Inventory Management
- Asset Discovery and Booking
- Request Approval Workflow
- Asset Allocation and Return Tracking
- Dashboard Analytics
- Notification Management
- Audit Logging
- QR Code Based Asset Operations

The application ensures accurate inventory management while improving operational efficiency and accountability.

---

## Demo Video

Video Demonstration:

[Demo Video Link](https://drive.google.com/file/d/1JxO1f-OkUhAWlnUJHKFByxFs9HKdAJG8/view?usp=sharing)

---

## Design Document

Project Design Document:

[Design Document PDF](https://1drv.ms/w/c/2343e01caf661387/IQAr-Ohy4uWQT5CEVC2rxHcdAUyrVE-gVv-xeoz8mQer3W8?e=fYDjuk)

---

## Technology Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- JWT Authentication

### Database

- MongoDB
- Mongoose

### Additional Libraries

- Axios
- Sonner (Toast Notifications)
- QRCode
- React QR Scanner
- Recharts

---

## Features

### Authentication & Authorization

- User Registration
- User Login
- User Logout
- JWT Authentication
- Role-Based Access Control

### Inventory Management

- Create Assets
- Update Assets
- Delete Assets
- Asset Categorization
- Inventory Tracking

### Asset Discovery & Booking

- Browse Assets
- Search Assets
- Filter by Category
- Create Asset Requests

### Approval Workflow

- Approve Requests
- Reject Requests
- Inventory Validation

### Asset Allocation & Returns

- Asset Issuance
- Return Tracking
- Due Date Management
- Overdue Detection

### Dashboard Analytics

- Total Assets
- Available Assets
- Active Allocations
- Pending Requests
- Total Users
- Asset Categories

### Notifications

- Request Approved Notifications
- Request Rejected Notifications
- Asset Returned Notifications
- Overdue Asset Notifications

### Audit Logs

- Asset Creation Logs
- Asset Update Logs
- Asset Deletion Logs
- Request Approval Logs
- Request Rejection Logs
- Asset Return Logs

### QR Code Features

- Automatic QR Generation
- QR Download
- QR Viewing
- QR Scanner
- Asset Detail Redirection

---

## System Roles

### Administrator

Administrators can:

- Manage Assets
- Approve Requests
- Reject Requests
- Monitor Allocations
- Access Analytics Dashboard
- View Audit Logs
- Manage Inventory

### User

Users can:

- Browse Assets
- Create Requests
- View Allocations
- Return Assets
- View Notifications
- Scan QR Codes

---

## Project Structure

```text
src
│
├── app
│   ├── api
│   ├── dashboard
│   ├── login
│   └── register
│
├── components
│
├── lib
│
├── models
│
├── types
│
├── validations
│
└── middleware
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Mahig2510/smart-asset-management-platform.git
```

### Navigate to Project

```bash
cd smart-asset-management-platform
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Running the Application

### Development Server

```bash
npm run dev
```

Application will run at:

```text
http://localhost:3000
```

---

## Default Workflow

### User Workflow

1. Register/Login
2. Browse Assets
3. Create Asset Request
4. Track Request Status
5. View Allocations
6. Return Asset
7. Receive Notifications

### Admin Workflow

1. Login
2. Create Assets
3. Manage Inventory
4. Review Requests
5. Approve/Reject Requests
6. Monitor Allocations
7. View Audit Logs
8. Analyze Dashboard Reports

---

## Future Enhancements

- Asset Health Tracking
- Email Notifications
- Docker Deployment
- Advanced Reporting
- Multi-Organization Support

---

## Evaluation Features Covered

### Core Features

- Authentication
- Inventory Management
- Asset Discovery
- Approval Workflow
- Asset Allocation
- Asset Return Tracking
- Dashboard Analytics
- Borrowing History

### Optional Features Implemented

- Notification System
- Audit Logs
- QR Code Operations

---

## Author

**Mahi Yadav**

Smart Asset Management Platform

Developed as a full-stack web application using Next.js, MongoDB, TypeScript, and Tailwind CSS.
