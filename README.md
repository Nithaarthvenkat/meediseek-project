# MediSeek — Tamil Nadu Hospital Ranking System

A full-stack web application for ranking and discovering hospitals across Tamil Nadu, with symptom-based smart finder, interactive maps, and MongoDB-backed user authentication.

---

## Project Structure

```
mediseek/
├── server.js              ← Express server entry point
├── package.json           ← Node dependencies
├── .env                   ← Environment variables (MongoDB URI, port, session secret)
│
├── config/
│   └── db.js              ← MongoDB connection setup
│
├── models/
│   └── User.js            ← Mongoose User schema (with bcrypt password hashing)
│
├── routes/
│   └── auth.js            ← API routes: /register, /login, /logout, /me, /profile
│
└── public/                ← Static frontend files (served by Express)
    ├── index.html         ← Main HTML page (Login + Dashboard)
    ├── css/
    │   └── style.css      ← All styles
    └── js/
        ├── main.js        ← All frontend logic (auth, hospitals, UI, analytics)
        └── hospitals.json ← 50 Tamil Nadu hospital records
```

---

## Prerequisites

Make sure these are installed on your machine:

| Tool | Download |
|------|----------|
| Node.js (v18+) | https://nodejs.org |
| MongoDB Community Server | https://www.mongodb.com/try/download/community |
| MongoDB Compass (GUI) | https://www.mongodb.com/try/download/compass |

---

## Setup & Run

### 1. Install dependencies
```bash
cd mediseek
npm install
```

### 2. Make sure MongoDB is running

**On Windows:**
```
net start MongoDB
```
or open "Services" and start "MongoDB".

**On macOS:**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

### 3. Start the server
```bash
npm start
```

For development with auto-restart on file changes:
```bash
npm run dev
```

### 4. Open the app
Visit: **http://localhost:3000**

You will see the login page. Create an account first, then sign in.

---

## View User Data in MongoDB Compass

1. Open **MongoDB Compass**
2. Click **"New Connection"**
3. Paste this connection string:
   ```
   mongodb://127.0.0.1:27017
   ```
4. Click **Connect**
5. In the left panel, open: `mediseek` → `users`
6. You will see all registered users with:
   - `firstName`, `lastName`, `username`, `email`
   - `password` (bcrypt hashed — never stored in plain text)
   - `createdAt`, `updatedAt` timestamps
   - `loginHistory` array (each login recorded with timestamp and IP)

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Sign in with username + email + password |
| POST | `/api/auth/logout` | Sign out and clear session |
| GET | `/api/auth/me` | Get current logged-in user info |
| PUT | `/api/auth/profile` | Update name |

### Example: Register
```json
POST /api/auth/register
{
  "firstName": "Priya",
  "lastName": "Sharma",
  "username": "priya_sharma",
  "email": "priya@example.com",
  "password": "MyPassword@123"
}
```

### Example: Login
```json
POST /api/auth/login
{
  "username": "priya_sharma",
  "email": "priya@example.com",
  "password": "MyPassword@123"
}
```

---

## Features

- **Login & Register** — Username + Email + Password. Passwords stored as bcrypt hash (never plain text). Duplicate username/email rejected. Session persists for 7 days.
- **Smart Hospital Finder** — Enter your city + symptoms (or tap quick-select pills). Analyses 70+ symptom patterns and shows severity level (Mild / Moderate / Urgent / Immediate) with calm advice, then lists the top 5 best-matching nearby hospitals.
- **Hospital Rankings** — All 50 Tamil Nadu hospitals ranked by composite quality score. Filter by type, city, certification (JCI / NABH / NABL), and speciality.
- **Compare** — Pick any two hospitals for a side-by-side metric comparison.
- **Analytics** — Bar charts, donut chart, accreditation coverage, top cities ranking.
- **Interactive Map** — Google Maps embed with cluster buttons (Chennai, Coimbatore, Madurai, Trichy, Salem, Vellore, Tirunelveli). Click markers to get directions.
- **Search** — Live search bar in navbar. Clicking a result opens the hospital in Google Maps directly.

---

## Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose ODM) |
| Auth | bcryptjs (password hashing), express-session |
| Data | hospitals.json (50 TN hospitals with coordinates, scores, certifications) |

---

## Environment Variables (.env)

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/mediseek
SESSION_SECRET=mediseek_super_secret_key_2024
```

Change `SESSION_SECRET` to something random and private before deploying.

---

## Troubleshooting

**"Could not connect to server"** on login/register:
→ Make sure `npm start` is running in terminal.

**MongoDB connection error on startup**:
→ Make sure MongoDB service is running (see Step 2 above).

**Port already in use**:
→ Change `PORT=3000` in `.env` to another port like `3001`.
