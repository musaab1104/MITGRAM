const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  info: { type: String, required: true }
});

const Upload =new mongoose.model("Upload", uploadSchema);

module.exports = Upload;     