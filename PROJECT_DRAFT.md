# Final Project Draft
## Charity/Donation Platform

**Course:** Web Application Development  
**Date:** February 1, 2026  
**Team Members:** Bekzat, Nazarbek, Maqsat, Raibek

---

## 1. Project Proposal

### Project Title
**CharityHub - Online Charity and Donation Management Platform**

### Topic
CharityHub is a full-stack web application that connects donors with charitable causes through an intuitive platform for campaign management and secure donation processing. The system enables organizations to create fundraising campaigns while providing donors with a transparent way to contribute to causes they care about, with real-time progress tracking and automated email notifications.

### Why Did We Choose It?

We chose this project for several compelling reasons:

1. **Social Impact**: The project addresses a real-world need by making charitable giving more accessible and transparent, potentially helping many non-profit organizations reach their fundraising goals.

2. **Technical Complexity**: It demonstrates our full-stack development skills by combining:
   - Complex backend architecture with multiple collections and relationships
   - Secure authentication and authorization systems
   - Role-based access control (RBAC)
   - Email integration for user engagement
   - Real-time data updates and tracking

3. **Practical Application**: The system can be used by real organizations, NGOs, and individuals to manage fundraising campaigns, making it more than just an academic exercise.

4. **Learning Opportunities**: The project allowed us to work with modern web technologies including:
   - Node.js and Express.js for backend development
   - MongoDB for NoSQL database management
   - JWT for secure authentication
   - Email services integration (SendGrid/Mailgun)
   - Professional frontend development with vanilla JavaScript

5. **Team Collaboration**: The project structure naturally divides into components that allow effective teamwork, with clear responsibilities for each team member.

### Main Features

#### For All Users (Public)
1. **Campaign Browsing**
   - View all active charity campaigns
   - Filter campaigns by category (Education, Healthcare, Environment, Poverty, Disaster Relief, Other)
   - Filter by campaign status (Active, Completed, Closed)
   - View detailed campaign information including:
     - Campaign description and goals
     - Current funding amount and target goal
     - Progress visualization with percentage completion
     - Days remaining until campaign end
     - Recent donations and supporter messages

2. **Campaign Details**
   - Comprehensive campaign information page
   - Real-time progress tracking
   - List of recent donations (respecting anonymous preferences)
   - Campaign creator information
   - Social sharing capabilities

#### For Registered Users
3. **User Registration & Authentication**
   - Secure registration with email validation
   - JWT-based authentication
   - Password hashing with bcrypt
   - Automatic welcome email upon registration

4. **Donation Management**
   - Make donations to active campaigns
   - Add optional support messages with donations
   - Option for anonymous donations
   - Automated thank-you emails after donations
   - View complete donation history

5. **Personal Dashboard**
   - View profile information
   - Update profile (username, email)
   - Track donation statistics:
     - Total amount donated
     - Number of donations made
     - List of all donations with details
   - View donation history in a clean, organized table

#### For Moderators
6. **Campaign Creation**
   - Create new fundraising campaigns
   - Set campaign details:
     - Title and description
     - Goal amount
     - Category selection
     - End date
     - Campaign image URL
   - Edit own campaigns
   - Update campaign status

7. **Campaign Management**
   - Monitor campaign progress
   - Update campaign information
   - Track donations received
   - Manage campaign timeline

#### For Administrators
8. **Full Campaign Control**
   - All moderator capabilities
   - Edit any campaign regardless of creator
   - Delete campaigns when necessary
   - Change campaign status (Active/Completed/Closed)
   - Access comprehensive analytics

9. **Donation Management**
   - View all donations across all campaigns
   - Delete inappropriate or fraudulent donations
   - Monitor donation patterns
   - Access donor information (non-anonymous)

#### Advanced Features
10. **Role-Based Access Control (RBAC)**
    - Three distinct user roles: User, Moderator, Admin
    - Hierarchical permissions system
    - Protected routes based on user roles
    - Dynamic UI based on user permissions

11. **Email Notification System**
    - Integration with professional email services (SendGrid/Mailgun)
    - Automated welcome emails for new users
    - Thank-you emails after donations
    - Environment-based email configuration
    - Professional email templates

12. **Data Validation & Security**
    - Input validation using Joi library
    - Comprehensive validation schemas for:
      - User registration and login
      - Profile updates
      - Campaign creation and updates
      - Donation processing
    - SQL injection prevention
    - XSS protection
    - Secure password storage

13. **Error Handling**
    - Global error handling middleware
    - Meaningful error messages
    - Appropriate HTTP status codes:
      - 200 (Success)
      - 201 (Created)
      - 400 (Bad Request)
      - 401 (Unauthorized)
      - 403 (Forbidden)
      - 404 (Not Found)
      - 500 (Internal Server Error)

14. **Progress Tracking**
    - Real-time campaign progress calculation
    - Percentage completion visualization
    - Automatic updates when donations are made
    - Days remaining countdown

15. **Anonymous Donations**
    - Privacy option for donors
    - Donor information hidden from public view
    - Still tracked for user's personal records

---

## 2. Team Members and Their Responsibilities

### Bekzat - Backend Lead & Database Architect
**Primary Responsibilities:**
- Database schema design and implementation
- MongoDB integration and optimization
- User and Campaign models development
- Database relationships and data integrity
- MongoDB queries and aggregations
- Testing database operations

**Secondary Responsibilities:**
- Assistance with authentication middleware
- Code reviews for backend components
- Database documentation

**Deliverables:**
- Complete database schemas
- Model files (User.js, Campaign.js, Donation.js)
- Database configuration
- Database seeding scripts (if needed)

---

### Nazarbek - Authentication & Security Specialist
**Primary Responsibilities:**
- JWT authentication implementation
- Password hashing with bcrypt
- Authentication middleware development
- Role-based access control (RBAC) implementation
- Security best practices implementation
- Token verification and management

**Secondary Responsibilities:**
- User controller development
- Security documentation
- Testing authentication flows

**Deliverables:**
- authController.js
- authMiddleware.js
- roleMiddleware.js
- Security documentation
- Authentication flow diagrams

---

### Maqsat - API Developer & Validation Specialist
**Primary Responsibilities:**
- RESTful API endpoint development
- Controllers for campaigns and donations
- Input validation with Joi
- Error handling middleware
- API route configuration
- Request/response handling

**Secondary Responsibilities:**
- API documentation
- Integration testing
- Postman collection creation

**Deliverables:**
- campaignController.js
- donationController.js
- validate.js middleware
- errorMiddleware.js
- Complete API documentation
- Postman collection for testing

---

### Raibek - Frontend Developer & Integration Specialist
**Primary Responsibilities:**
- Frontend development (HTML, CSS, JavaScript)
- User interface design and implementation
- API integration from frontend
- Email service integration (Nodemailer)
- Deployment preparation
- Testing and bug fixing

**Secondary Responsibilities:**
- Documentation (README, guides)
- Project setup and configuration
- Screenshots and demo preparation

**Deliverables:**
- All HTML pages (index, login, register, dashboard, admin, campaign-details)
- CSS styling (style.css)
- JavaScript modules (api.js, auth.js, campaigns.js, donations.js, guard.js)
- Email configuration (mail.js)
- README.md and documentation
- Deployment guides

---

### Shared Responsibilities (All Team Members)
- Code reviews for other team members
- Testing individual components
- Documentation updates
- Bug fixing and troubleshooting
- Project defense preparation
- Git workflow and version control
- Team meetings and communication

---

## 3. Database Design (Schemas)

### User Collection
```javascript
{
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Don't return password by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- Unique index on `email`
- Unique index on `username`
- Index on `role` for role-based queries

**Middleware:**
- Pre-save hook for password hashing
- Method for password comparison

---

### Campaign Collection
```javascript
{
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  goalAmount: {
    type: Number,
    required: true,
    min: 1
  },
  currentAmount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Education', 'Healthcare', 'Environment', 
           'Poverty', 'Disaster Relief', 'Other']
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'closed'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Campaign+Image'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Virtual Fields:**
- `percentageCompleted` - Calculated as (currentAmount / goalAmount) * 100

**Indexes:**
- Index on `status` for filtering
- Index on `category` for filtering
- Index on `createdBy` for user's campaigns
- Compound index on `status` and `category`

**Relationships:**
- `createdBy` references User collection
- One-to-many with User (one user can create many campaigns)

---

### Donation Collection
```javascript
{
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    trim: true,
    maxlength: 500
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- Index on `campaign` for campaign donations
- Index on `donor` for user donations
- Compound index on `campaign` and `status`

**Middleware:**
- Post-save hook to update campaign's `currentAmount`

**Relationships:**
- `campaign` references Campaign collection
- `donor` references User collection
- Many-to-one with Campaign (many donations to one campaign)
- Many-to-one with User (many donations from one user)

---

### Database Relationships Diagram

```
User (1) ─────creates────────> (Many) Campaign
  │
  │
  └──────makes─────────> (Many) Donation
                              │
                              │
Campaign (1) <────for─────── (Many) Donation
```

---

## 4. API Endpoint List

### Authentication Endpoints (Public)

#### POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Validation:**
- Username: min 3 characters, required
- Email: valid email format, required
- Password: min 6 characters, required

**Features:**
- Passwords hashed with bcrypt
- Sends welcome email
- Returns JWT token
- Checks for duplicate username/email

---

#### POST /api/auth/login
Authenticate user and get token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Validation:**
- Email: required, valid format
- Password: required

**Features:**
- Compares hashed passwords
- Returns JWT token
- Returns user info (without password)

---

### User Endpoints (Private - Requires Authentication)

#### GET /api/users/profile
Get current user's profile

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Authorization:**
- Requires valid JWT token
- Any authenticated user

---

#### PUT /api/users/profile
Update user profile

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "username": "johnsmith",
  "email": "johnsmith@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "username": "johnsmith",
    "email": "johnsmith@example.com",
    "role": "user"
  }
}
```

**Validation:**
- At least one field required
- Username: min 3 characters if provided
- Email: valid format if provided

**Authorization:**
- Requires valid JWT token
- User can only update their own profile

---

### Campaign Endpoints

#### GET /api/campaigns
Get all campaigns (Public)

**Query Parameters:**
- `status` (optional): active, completed, closed
- `category` (optional): Education, Healthcare, Environment, Poverty, Disaster Relief, Other

**Example:**
```
GET /api/campaigns?status=active&category=Education
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "campaigns": [
    {
      "_id": "64b2c3d4e5f6g7h8i9j0k1l2",
      "title": "Build School in Rural Area",
      "description": "Help us build a school...",
      "goalAmount": 50000,
      "currentAmount": 15000,
      "category": "Education",
      "status": "active",
      "createdBy": {
        "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
        "username": "admin"
      },
      "endDate": "2024-12-31T23:59:59.000Z",
      "imageUrl": "https://example.com/image.jpg",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "percentageCompleted": 30
    }
  ]
}
```

**Features:**
- Populates creator information
- Includes virtual field for percentage
- Sorted by creation date (newest first)

---

#### GET /api/campaigns/:id
Get single campaign (Public)

**Response (200):**
```json
{
  "success": true,
  "campaign": {
    "_id": "64b2c3d4e5f6g7h8i9j0k1l2",
    "title": "Build School in Rural Area",
    "description": "Help us build a school for 500 children...",
    "goalAmount": 50000,
    "currentAmount": 15000,
    "category": "Education",
    "status": "active",
    "createdBy": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "username": "admin",
      "email": "admin@example.com"
    },
    "endDate": "2024-12-31T23:59:59.000Z",
    "imageUrl": "https://example.com/image.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "percentageCompleted": 30
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Campaign not found"
}
```

---

#### POST /api/campaigns
Create new campaign (Private - Admin/Moderator only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Clean Water Project",
  "description": "Provide clean water to 1000 families...",
  "goalAmount": 25000,
  "category": "Healthcare",
  "endDate": "2024-12-31",
  "imageUrl": "https://example.com/water.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Campaign created successfully",
  "campaign": {
    "_id": "64c3d4e5f6g7h8i9j0k1l2m3",
    "title": "Clean Water Project",
    "description": "Provide clean water to 1000 families...",
    "goalAmount": 25000,
    "currentAmount": 0,
    "category": "Healthcare",
    "status": "active",
    "createdBy": "64a1b2c3d4e5f6g7h8i9j0k1",
    "endDate": "2024-12-31T00:00:00.000Z",
    "imageUrl": "https://example.com/water.jpg",
    "createdAt": "2024-01-20T14:30:00.000Z"
  }
}
```

**Validation:**
- Title: min 5, max 200 characters
- Description: min 10 characters
- Goal Amount: min 1
- Category: must be valid enum value
- End Date: must be in future
- Image URL: valid URL format (optional)

**Authorization:**
- Requires JWT token
- User role must be 'admin' or 'moderator'

**Error Response (403):**
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

---

#### PUT /api/campaigns/:id
Update campaign (Private - Admin/Moderator only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "completed",
  "description": "Updated description..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Campaign updated successfully",
  "campaign": { ... }
}
```

**Validation:**
- At least one field required
- All fields optional but validated if provided

**Authorization:**
- Requires JWT token
- Admin can edit any campaign
- Moderator can only edit own campaigns

---

#### DELETE /api/campaigns/:id
Delete campaign (Private - Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Campaign deleted successfully"
}
```

**Authorization:**
- Requires JWT token
- User role must be 'admin'

---

### Donation Endpoints

#### POST /api/donations
Create donation (Private)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 100,
  "campaign": "64b2c3d4e5f6g7h8i9j0k1l2",
  "message": "Keep up the good work!",
  "isAnonymous": false
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Donation created successfully",
  "donation": {
    "_id": "64e5f6g7h8i9j0k1l2m3n4o5",
    "amount": 100,
    "campaign": {
      "_id": "64b2c3d4e5f6g7h8i9j0k1l2",
      "title": "Build School in Rural Area"
    },
    "donor": {
      "_id": "64a1b2c3d4e5f6g7h8i9j0k1",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "message": "Keep up the good work!",
    "isAnonymous": false,
    "status": "completed",
    "createdAt": "2024-01-23T11:20:00.000Z"
  }
}
```

**Validation:**
- Amount: min 1, required
- Campaign: valid ObjectId, required
- Message: max 500 characters, optional
- isAnonymous: boolean, optional (default false)

**Features:**
- Verifies campaign exists and is active
- Updates campaign's currentAmount
- Sends thank-you email to donor
- Populates campaign and donor info

**Authorization:**
- Requires JWT token
- Any authenticated user

---

#### GET /api/donations
Get user's donations (Private)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "donations": [
    {
      "_id": "64d4e5f6g7h8i9j0k1l2m3n4",
      "amount": 100,
      "campaign": {
        "_id": "64b2c3d4e5f6g7h8i9j0k1l2",
        "title": "Build School in Rural Area",
        "category": "Education",
        "goalAmount": 50000
      },
      "message": "Great cause!",
      "isAnonymous": false,
      "status": "completed",
      "createdAt": "2024-01-22T09:15:00.000Z"
    }
  ]
}
```

**Features:**
- Returns only logged-in user's donations
- Sorted by date (newest first)
- Populates campaign info

**Authorization:**
- Requires JWT token
- User sees only their own donations

---

#### GET /api/donations/:id
Get single donation (Private)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "donation": { ... }
}
```

**Authorization:**
- Requires JWT token
- User can only view their own donations
- Admin can view any donation

---

#### GET /api/donations/campaign/:campaignId
Get campaign donations (Public)

**Response (200):**
```json
{
  "success": true,
  "count": 15,
  "donations": [
    {
      "_id": "64d4e5f6g7h8i9j0k1l2m3n4",
      "amount": 100,
      "donor": {
        "username": "johndoe"
      },
      "message": "Great cause!",
      "createdAt": "2024-01-22T09:15:00.000Z"
    },
    {
      "_id": "64d4e5f6g7h8i9j0k1l2m3n5",
      "amount": 50,
      "donor": {
        "username": "Anonymous"
      },
      "message": null,
      "createdAt": "2024-01-21T15:30:00.000Z"
    }
  ]
}
```

**Features:**
- Shows only completed donations
- Hides donor info for anonymous donations
- Limited to 50 most recent donations
- Sorted by date (newest first)

---

#### DELETE /api/donations/:id
Delete donation (Private - Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Donation deleted successfully"
}
```

**Features:**
- Decreases campaign's currentAmount if donation was completed

**Authorization:**
- Requires JWT token
- User role must be 'admin'

---

## 5. Folder Structure

```
charity-donation-app/
│
├── src/                              # Backend Source Code
│   │
│   ├── controllers/                  # Request Handlers
│   │   ├── authController.js         # Registration & Login
│   │   ├── userController.js         # User Profile Management
│   │   ├── campaignController.js     # Campaign CRUD Operations
│   │   └── donationController.js     # Donation Processing
│   │
│   ├── models/                       # Database Schemas
│   │   ├── User.js                   # User Model
│   │   ├── Campaign.js               # Campaign Model
│   │   └── Donation.js               # Donation Model
│   │
│   ├── routes/                       # API Route Definitions
│   │   ├── authRoutes.js             # Auth Endpoints
│   │   ├── userRoutes.js             # User Endpoints
│   │   ├── campaignRoutes.js         # Campaign Endpoints
│   │   └── donationRoutes.js         # Donation Endpoints
│   │
│   ├── middleware/                   # Custom Middleware
│   │   ├── authMiddleware.js         # JWT Verification
│   │   ├── roleMiddleware.js         # RBAC Authorization
│   │   ├── errorMiddleware.js        # Global Error Handler
│   │   └── validate.js               # Joi Validation Schemas
│   │
│   ├── config/                       # Configuration Files
│   │   ├── db.js                     # MongoDB Connection
│   │   └── mail.js                   # Email Service Config
│   │
│   └── app.js                        # Express App Setup
│
├── frontend/                         # Frontend Code
│   │
│   ├── HTML Pages
│   ├── index.html                    # Campaign Listing
│   ├── login.html                    # Login Page
│   ├── register.html                 # Registration Page
│   ├── dashboard.html                # User Dashboard
│   ├── admin.html                    # Admin Panel
│   └── campaign-details.html         # Campaign Details
│   │
│   ├── css/                          # Stylesheets
│   │   └── style.css                 # Main Stylesheet
│   │
│   └── js/                           # JavaScript Modules
│       ├── api.js                    # API Communication
│       ├── auth.js                   # Authentication Logic
│       ├── campaigns.js              # Campaign Display
│       ├── donations.js              # Donation Handling
│       └── guard.js                  # Route Protection
│
├── screenshots/                      # Application Screenshots
│   ├── campaigns.png                 # Campaign Listing
│   ├── login.png                     # Login Page
│   ├── register.png                  # Registration
│   ├── dashboard.png                 # User Dashboard
│   ├── admin.png                     # Admin Panel
│   └── create-campaign.png           # Campaign Creation
│
├── server.js                         # Server Entry Point
├── package.json                      # Dependencies
├── .env                              # Environment Variables
├── .env.example                      # Environment Template
├── .gitignore                        # Git Ignore Rules
│
├── README.md                         # Project Documentation
├── QUICKSTART.md                     # Quick Setup Guide
├── DEPLOYMENT.md                     # Deployment Instructions
├── RUSSIAN_GUIDE.md                  # Russian Instructions
└── PROJECT_SUMMARY.md                # Project Checklist
```

### File Responsibilities by Team Member

#### Bekzat (Database)
```
src/models/
├── User.js
├── Campaign.js
└── Donation.js

src/config/
└── db.js
```

#### Nazarbek (Authentication & Security)
```
src/controllers/
├── authController.js
└── userController.js

src/middleware/
├── authMiddleware.js
└── roleMiddleware.js
```

#### Maqsat (API & Validation)
```
src/controllers/
├── campaignController.js
└── donationController.js

src/middleware/
├── validate.js
└── errorMiddleware.js

src/routes/
├── authRoutes.js
├── userRoutes.js
├── campaignRoutes.js
└── donationRoutes.js
```

#### Raibek (Frontend & Integration)
```
frontend/
├── *.html (all pages)
├── css/style.css
└── js/*.js (all modules)

src/config/
└── mail.js

Documentation:
├── README.md
├── QUICKSTART.md
├── DEPLOYMENT.md
└── other guides
```

---

## 6. Technology Stack

### Backend
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js (v4.18+)
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Validation:** Joi
- **Email Service:** Nodemailer with SendGrid/Mailgun

### Frontend
- **HTML5:** Semantic markup
- **CSS3:** Custom styling, responsive design
- **JavaScript:** ES6+, Fetch API
- **No frameworks:** Vanilla JavaScript for learning purposes

### Development Tools
- **Version Control:** Git & GitHub
- **API Testing:** Postman
- **Database GUI:** MongoDB Compass
- **Code Editor:** VS Code
- **Package Manager:** npm

### Deployment
- **Options:** Render, Railway, or Replit
- **Database:** MongoDB Atlas (cloud)
- **Email:** SendGrid or Mailgun

---

## 7. Development Timeline

### Week 1: Planning & Setup (Completed)
- ✅ Project proposal
- ✅ Database design
- ✅ API endpoint planning
- ✅ Technology selection
- ✅ Team role assignment

### Week 2: Backend Development
**Bekzat:**
- Set up MongoDB connection
- Create User, Campaign, Donation models
- Test database operations

**Nazarbek:**
- Implement JWT authentication
- Create auth controller
- Develop authentication middleware
- Implement RBAC

**Maqsat:**
- Create campaign controller
- Create donation controller
- Set up validation schemas
- Implement error handling

**Raibek:**
- Set up project structure
- Configure environment variables
- Email service setup

### Week 3: Frontend & Integration
**Raibek (Primary):**
- Create all HTML pages
- Implement CSS styling
- Develop JavaScript modules
- Integrate with backend API

**All Team:**
- Test individual components
- Fix bugs
- Code reviews

### Week 4: Testing & Deployment
**All Team:**
- Integration testing
- User acceptance testing
- Bug fixes
- Documentation updates
- Screenshot preparation
- Deployment to hosting platform
- Final testing on production

### Week 5: Defense Preparation
**All Team:**
- Review code and architecture
- Prepare presentation
- Practice demo
- Study theoretical questions
- Final polish

---

## 8. Testing Strategy

### Unit Testing
- Individual function testing
- Model validation testing
- Middleware testing

### Integration Testing
- API endpoint testing
- Authentication flow testing
- CRUD operations testing

### User Acceptance Testing
- Complete user flows
- Role-based access testing
- Email delivery testing
- Error handling verification

### Test Cases
1. User registration and login
2. Campaign creation by admin/moderator
3. Donation processing
4. Profile updates
5. Role-based access control
6. Email notifications
7. Data validation
8. Error scenarios

---

## 9. Security Measures

### Authentication & Authorization
- JWT tokens with expiration
- Password hashing with bcrypt (10 rounds)
- Protected routes with middleware
- Role-based access control

### Data Security
- Input validation on all endpoints
- SQL injection prevention (MongoDB)
- XSS protection
- CORS configuration
- Environment variables for secrets

### Best Practices
- No passwords in plain text
- Secure token storage
- HTTPS in production
- Rate limiting (can be added)
- Input sanitization

---

## 10. Future Enhancements (Post-Project)

### Potential Features
1. Payment gateway integration (Stripe/PayPal)
2. Social media sharing
3. Campaign comments and updates
4. File upload for campaign images
5. Email campaign updates to donors
6. Admin analytics dashboard
7. Search functionality
8. Donation receipts/certificates
9. Recurring donations
10. Multi-language support

### Scalability Improvements
1. Redis for caching
2. Image CDN integration
3. Database optimization
4. Load balancing
5. Microservices architecture

---

## 11. Learning Outcomes

### Technical Skills
- Full-stack web development
- RESTful API design
- Database modeling
- Authentication & authorization
- Email service integration
- Git workflow and collaboration

### Soft Skills
- Team collaboration
- Project management
- Problem-solving
- Code review practices
- Technical documentation
- Time management

---

## 12. Conclusion

This Charity/Donation Platform demonstrates our comprehensive understanding of modern web development practices. The project showcases:

1. **Full-Stack Proficiency:** Complete backend with Express/MongoDB and frontend with vanilla JavaScript
2. **Security Best Practices:** JWT authentication, password hashing, RBAC
3. **Professional Development:** Modular code structure, proper error handling, validation
4. **Real-World Application:** Solving actual problems for charitable organizations
5. **Team Collaboration:** Clear division of responsibilities and effective teamwork

We are confident this project meets all requirements and demonstrates our readiness for professional web development.

---

**Prepared by:**
- Bekzat (Database & Backend)
- Nazarbek (Authentication & Security)
- Maqsat (API & Validation)
- Raibek (Frontend & Integration)

**Date:** February 1, 2026
**Course:** Web Application Development
**Project:** CharityHub - Charity/Donation Platform
