
const { getSentimentReport, getSpeechToText, getAudioFile, MainApp } = require("../../../helper.js");
const {  MainApp2 } = require("../../../helper2.js");
const router = require('express').Router();


const express = require('express');

router.get('/get-data', async (req, res) => {
  console.log("Inside get-data route");
  try {
    const data = await MainApp2();
    console.log("DATA RETURNED", data);
    res.json(data); // Send the data as a JSON response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
