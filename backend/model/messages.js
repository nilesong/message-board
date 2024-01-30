const mongoose = require('mongoose');
const { DateTime } = require('luxon');

// Define schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: String,
  message: String,
  postDate: Date,
});

module.exports = mongoose.model("Message", MessageSchema);