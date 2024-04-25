//models/Contact.js

const mongoose = require('mongoose');

const contactSchema = new contact.Schema({
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
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
