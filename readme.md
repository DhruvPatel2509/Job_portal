# Job Portal Web Application

## Overview

The **Job Portal Web Application** is a comprehensive platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js) designed to bridge the gap between **job seekers** and **employers**. It provides an interactive and user-friendly environment for job searching, application management, and recruitment processes.

## Live Demo

[Live Project Link](https://your-live-link.com)

---

## Features

### For Job Seekers:

- **User Authentication**: Secure registration and login with JWT-based authentication.
- **Profile Management**: Create and manage user profiles, including resume uploads and profile photos.
- **Job Search**: Advanced job search with filters for location, industry, and job title.
- **Application Tracking**: Apply for jobs, track application statuses, and view application history.

### For Recruiters:

- **Company Profiles**: Register and manage company profiles with job postings.
- **Job Postings**: Create, update, and manage job listings.
- **Application Review**: View and manage job applications, and shortlist candidates.

### For Admin:

- **User Management**: View and manage job seekers and recruiters.
- **Job Moderation**: Approve or reject job listings to maintain quality.
- **Dashboard**: Monitor platform metrics and user activities.

## Technology Stack

### **Frontend**

- React.js for the user interface
- React Router for client-side routing
- Tailwind CSS for styling

### **Backend**

- Node.js with Express.js for RESTful API development
- JWT for authentication and authorization

### **Database**

- MongoDB for storing user and job-related data
- Mongoose for ODM (Object Data Modeling)

## Installation

### Prerequisites

- **Node.js** and **npm** (or yarn) installed
- **MongoDB server** (local or cloud-based)
- **Git** for version control

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

#### 2. Set Up the Environment Variables

##### **Frontend - Create `.env` file inside `/frontend`**

```
VITE_BASEURI= http://localhost:8000/api/v1/
```

##### **Backend - Create `.env` file inside `/backend`**

```
PORT=8000
MONGODB_URL=YOUR DATABASE
JWT_KEY=
CLOUD_NAME=
API_SEC=
API_KEY=

EMAIL_USER=
EMAIL_PASS=

ORIGIN_POINT=http://localhost:5173
```

#### 3. Install Dependencies

##### **For Backend**

```bash
cd backend
npm install
```

##### **For Frontend**

```bash
cd Frontend
npm install
```

#### 4. Start the Application

##### **Start the Backend**

```bash
cd backend
npm run dev
```

##### **Start the Frontend**

```bash
cd Frontend
npm run dev
```

### Contributors

- **Dhruv Patel** - [GitHub](https://github.com/DhruvPatel2509)

Feel free to contribute and enhance the project!
