# Fire Warden Management System

A cloud-based web application for the University of Winchester to record and manage the registered location of fire wardens on campus.

## Project Overview

This application allows fire wardens to log their working location at the beginning of each day and make amendments as needed. It provides a dashboard for the Health and Safety team to view the recorded locations of all fire warden staff.

## Features

- Record fire warden's unique staff number
- Record fire warden's first and surname
- Record fire warden's working location from a list of university buildings
- Record the date and time of each entry
- Amend recorded details
- Delete recorded details
- Dashboard view for Health and Safety team

## Technology Stack

- **Frontend**: React.js, React Router, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: Microsoft Azure SQL Server

## Project Structure

The project follows an MVC (Model-View-Controller) pattern:

### Backend

- **Models**: Data layer that interacts with the database
- **Controllers**: Business logic for handling requests
- **Routes**: API endpoints
- **Middlewares**: Request processing functions

### Frontend

- **Components**: UI components (Dashboard, Login, Register, WardenForm)
- **Contexts**: State management
- **Services**: API communication

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- Microsoft Azure account (for database)

### Database Setup

1. Create an Azure SQL Database
2. Execute the SQL scripts from `database-setup.md` to create the required tables

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file using the `.env.example` template and fill in your database credentials:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Using the Application

1. **Login**: Use the demo credentials (email: admin@winchester.ac.uk, password: password)
   
2. **Dashboard**: View all registered fire wardens, their locations, and last update time
   
3. **Add New Warden**: Click the "Add New Warden" button on the dashboard
   
4. **Edit Warden**: Click the "Edit" button next to a warden to update their details
   
5. **Delete Warden**: Click the "Delete" button to remove a warden

## Deployment to Azure

This application is designed to be deployed on Microsoft Azure:

### Database
- Use Azure SQL Database as described in the setup

### Backend
1. Create an Azure App Service (Node.js)
2. Set the environment variables in the Configuration section
3. Deploy the backend code to the App Service

### Frontend
1. Create an Azure Static Web App
2. Link to your GitHub repository or upload the built frontend
3. Set environment variables for the production API URL

## Future Enhancements

- Implement proper user authentication with JWT
- Add user management for administrators
- Create mobile app version
- Implement real-time notifications
- Add reporting and analytics features