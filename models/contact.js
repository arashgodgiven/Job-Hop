//models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  company: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
