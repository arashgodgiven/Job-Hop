<<<<<<< Updated upstream
// models/user.js
=======
// models/User.js
>>>>>>> Stashed changes

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
=======
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
>>>>>>> Stashed changes
});

const User = mongoose.model('User', userSchema);

module.exports = User;
