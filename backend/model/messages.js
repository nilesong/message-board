const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: String,
  message: String,
  uploadDate: Date,
});

module.exports = mongoose.model("Message", MessageSchema);