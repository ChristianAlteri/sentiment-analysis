const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  name: String,
  data: Buffer, // Store audio data as a Buffer
  contentType: String,
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;