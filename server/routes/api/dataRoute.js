
const { getSentimentReport, getSpeechToText, getAudioFile, MainApp } = require("../../../helper.js");
const {  MainApp2 } = require("../../../helper2.js");
const router = require('express').Router();
const Data = require('../../models/Data');
const { Schema, model } = require('mongoose');


const express = require('express');

router.get('/get-data', async (req, res) => {
  try {
    // post a request to the IBM api and 'get' the data
    const dataResponse = await MainApp2();

    const newDataArray = dataResponse.map((data) => {
      return {
        text: data.text,
        sentiment: data.sentiment,
        relevance: data.relevance,
        emotion: data.emotion,
        count: data.count,
      };
    });

    
    // Create a single document with an array of data objects
    const combinedData = {
      data: newDataArray,
    };
    const savedData = await Data.create(combinedData);

    // Insert the combined data into the database
    
    res.json({ message: "Data saved successfully", savedData });
  console.log("SAVED SUCCESS",savedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get('/get-fetched-data', async (req, res) => {

  try {
    const fetchedData = await Data.find(); // Fetch all data from the database
    res.json(fetchedData); // Send the fetched data as JSON response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
