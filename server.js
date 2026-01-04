console.log('Server script starting...');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
require('./passport-setup'); // Ensure this file doesn't have side effects that crash

const app = express();

// --- MongoDB Integation for Serverless ---
let isConnected = false; // Track connection status

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('using existing database connection');
    return;
  }

  console.log('creating new database connection');
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/codemittens');
    isConnected = true;
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit process in serverless, just log it. Request might fail but container stays.
  }
};
// -----------------------------------------

// Middleware to ensure DB is connected before processing request
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Express body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookies in prod preferably
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
// IMPORTANT: In Vercel, static files are served by Vercel's edge network if configured in 'public' or root.
// However, since we route everything to server.js in vercel.json, express needs to serve them.
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/good');
  } else {
    // Use path.join to assume file is in same directory as server.js
    res.sendFile(path.join(__dirname, 'login.html'));
  }
});

app.get('/failed', (req, res) => res.send('Failed to log in'));
app.get('/good', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.displayName}! <br><a href="/logout">Logout</a>`);
  } else {
    res.redirect('/');
  }
});

// Logout route
app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app; // Export app for testing or alternative serverless wrappers
