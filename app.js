// app.js

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');
const Contact = require('./models/Contact');
// const router = express.Router();
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
      const user = await User.findOne({ email: currentUser.email });
      res.status(200).json({ firstName: user.firstName, lastName: user.lastName, message: 'yes user email' });
    } else {
      res.status(401).json({ error: 'User not signed in', message: 'no user email' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
});

// Delete all users route
app.delete('/delete/users', async (req, res) => {
  try {
    // Delete all users from the database
    await User.deleteMany({});
    res.status(200).json({ success: true, message: 'All users deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete users' });
  }
});

// Delete specific user route
app.delete('/delete-user/:email', async (req, res) => {
    const { email } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ email });
        if (deletedUser) {
            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Serve users.html as a static file
app.use(express.static(path.join(__dirname, 'public')));

// Route to create a new contact for the current user
app.post('/contacts/create', async (req, res) => {
  try {
    const { firstName, lastName, position, company, email } = req.body;
    const currentUser = req.session.user;
    if (!currentUser) {
      return res.status(401).json({ error: 'User not signed in' });
    }
    const user = await User.findOne({ email: currentUser.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const contact = new Contact({
      firstName,
      lastName,
      position,
      company,
      email,
      user: user._id // Associate contact with the current user
    });
    await contact.save();
    res.status(201).json({ success: true, currentUser: currentUser, contact: contact, message: 'Contact created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create contact' });
  }
});

// Route to fetch contacts
app.get('/contacts', async (req, res) => {
    try {
        // Fetch contacts from the database for the current user
        const contacts = await Contact.find({ user: req.session.user._id });
        if (contacts.length === 0) {
            return res.status(200).json({ success: false, error: 'No contacts for this user' });
        }
        // Send contacts as JSON response
        res.status(200).json({ success: true, contacts });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
    }
});

// module.exports = router;

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
