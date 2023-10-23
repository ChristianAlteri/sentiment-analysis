const router = require('express').Router();
const Audio = require('../../models/Audio');
const { Schema, model } = require('mongoose');
const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-audio', upload.single('audio'), async (req, res) => {
  try {
    console.log("We're inside the upload audio route");
    const audioData = req.file.buffer;
    const contentType = req.file.mimetype;

    const newAudio = new Audio({
      name: 'Your Audio Name', // Set a name for the audio (you can customize this)
      data: audioData,
      contentType,
    });

    await newAudio.save();
    res.status(201).json({ message: 'Audio uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading audio' });
  }
});



router.get('/get-audio', async (req, res) => {
  try {
    // Assuming Audio is your Mongoose model
    const audio = await Audio.findOne({ name: 'Your Audio Name' }); // Find the audio by name

    if (!audio) {
      return res.status(404).json({ message: 'Audio not found' });
    }

    const audioData = audio.data.$binary.base64; // Extract the Base64 audio data
    const contentType = audio.contentType;

    if (audioData && contentType) {
      // Convert the Base64 data to a Buffer
      const audioBuffer = Buffer.from(audioData, 'base64');

      // Set the response content type
      res.set('Content-Type', contentType);

      // Send the audio data as the response
      res.send(audioBuffer);
    } else {
      res.status(500).json({ message: 'Invalid audio data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting audio' });
  }
});

  

module.exports = router; // Export the router at the end of the file
