# Vishnu Event Booking Application 🎟️

A full-stack MERN event booking and event management application customized for **Vishnu**.

## Tech Stack

- Frontend: React 18, React Router, Axios, React Datepicker
- Backend: Node.js, Express.js, Mongoose
- Database: MongoDB / MongoDB Atlas
- Authentication: JWT + bcrypt
- Deployment: Vercel (frontend) + Render/Railway (backend)

## Project Structure

```text
booking-app-main/
├── frontend/   # React application
├── backend/    # Express REST API
├── asset/      # Project images
└── DEPLOYMENT.md
```

## Run locally

### 1. Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and adjust the values if necessary. Then run:

```bash
npm start
```

The API runs on `http://localhost:3001` by default.

### 2. Frontend

In another terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env` if you want to set the API URL explicitly. Then:

```bash
npm start
```

The React application runs on `http://localhost:3000`.

## Production deployment

Use **Vercel for the React frontend** and **Render/Railway for the traditional Express backend**. Use **MongoDB Atlas** for the production database.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the deployment steps and required environment variables.

## Main features

- User registration and login
- General user and organizer roles
- Event creation
- Event listing
- Event booking
- Reservation history
- Booking export to Excel
- JWT-based authentication support

## Customized for

**Vishnu**

> Do not commit `.env` files or production secrets to GitHub.


### Validation update
User registration and login now reject blank usernames/passwords, trim usernames, prevent duplicate usernames, and avoid logging passwords to the server console.
