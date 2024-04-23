// models/contact.js

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
    position: String,
    company: String,
    email: {
      type: String,
      required: true
    },
    portfolio: String
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
