const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  profile: Object,
  repositories: Array,
  followers: Array,
  following: Array,
  contributions: Array,
});

module.exports = mongoose.model('User', userSchema);
