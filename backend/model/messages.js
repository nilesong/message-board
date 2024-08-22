const mongoose = require('mongoose');
const { DateTime } = require('luxon');

// Define schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  // thread: String,
  name: String,
  message: String,
  postDate: Date,
});

module.exports = mongoose.model("Message", MessageSchema);