console.log('Server script starting...');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('./passport-setup');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/codemittens')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/good');
  } else {
    res.sendFile(__dirname + '/login.html');
  }
});
app.get('/failed', (req, res) => res.send('Failed to log in'));
app.get('/good', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.displayName}!`);
  } else {
    res.redirect('/');
  }
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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
