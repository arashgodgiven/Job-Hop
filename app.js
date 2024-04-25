// app.js

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');
require('./db');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
// app.use('/users', usersRouter); // Mount the users router

// Serve static files (if needed)
app.use(express.static('public'));

// Configure session middleware
app.use(session({
    secret: 'secret_key_as#14da12g3#1%^rqsad1$2', // Should change this to a random string and find better way soon
    resave: false,
    saveUninitialized: false
}));

// Sign-up route
app.post('/signup/check', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists with given email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({  success: false, error: 'User already exists' }); // Return to make sure execution of function stops here
    }
    // User doesn't exist, go to next step
    res.status(200).json({ success: true, message: 'Email is available for sign-up' });
  } catch (error) {
    res.status(500).json({  success: false, error: 'Internal server error, or something else must have went wrong!' });
  }
});
app.post('/signup/complete', async (req, res) => {
  const { phoneNumber, firstName, lastName, dateOfBirth, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({  success: false, error: 'User already exists' }); // Return to make sure execution of function stops here
    }
    // User doesn't exist, create new user
    const user = new User({ firstName, lastName, dateOfBirth, phoneNumber, email, password });
    await user.save();
    res.status(200).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({  success: false, error: 'Internal server error, or something else must have went wrong!' });
  }
});

// Sign-in route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // const user = await User.findOne({ email, password });
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: 'Invalid credentials!' });
    }
    else if (user) {
      const user = await User.findOne({ email, password });
      if(!user) {
        return res.status(404).json({ success: false, message: 'Incorrect password. Try again!' });
      }
      else {
        req.session.user = { email: user.email };
        res.status(200).json({ success: true, message: 'Signed in!' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Error signing in!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Route to fetch currently signed-in user's email
app.get('/current-user', async (req, res) => {
    try {
        // Retrieve user data from session
        const currentUser = req.session.user;
        if (currentUser) {
            res.status(200).json({ email: currentUser.email, message: 'yes user email' });
        } else {
            res.status(401).json({ error: 'User not signed in', message: 'no user email' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch current user' });
    }
});

// Serve users.html as a static file
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
