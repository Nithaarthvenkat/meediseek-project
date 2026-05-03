require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Connect MongoDB ──────────────────────────────────────
connectDB();

// ── Middleware ───────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (stores logged-in user)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production with HTTPS
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// ── Static files ─────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── API Routes ───────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));

// ── Serve index.html for all other routes ────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║         MediSeek Server Started          ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  Local:   http://localhost:${PORT}           ║`);
  console.log(`║  MongoDB: ${process.env.MONGO_URI}  ║`);
  console.log('║  Compass: Open MongoDB Compass and       ║');
  console.log(`║           paste the MONGO_URI above      ║`);
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
});
