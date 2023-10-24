const { IamAuthenticator } = require("ibm-watson/auth");

const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");

const fs = require("fs");
// const fs = require('browserify-fs');

const axios = require("axios");


// TODO: this will be the audio file stored in MongoDB so we need to late perform a get request to the server
function getAudioFile() {
  const audioFilePath = "storeChat.mp3";
  return audioFilePath;
}

// function to get the sentiment report
function getSentimentReport(txtFile) {
  return new Promise((resolve, reject) => {
    // console.log("Transcript: \n", txtFile);
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2022-04-07",
    authenticator: new IamAuthenticator({
      apikey: "PqUfyZLghyP9CDvAIt0O1S0GcYlGl5xnrrqm6v6xs_yB",
    }),
    serviceUrl:
      "https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/5fbfbe6e-0f7d-4f5e-959d-23324008a8aa",
  });

  const analyzeParams = {
    text: txtFile,
    features: {
      keywords: {
        sentiment: true,
        emotion: true,
        limit: 15,
      },
    },
  };

  naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      const keywords = analysisResults.result.keywords;
      return resolve(keywords);
      // for (const keyword of keywords) {
      //   console.log("Keyword:", keyword.text);
      //   console.log(
      //     "Sentiment:",
      //     `Score: ${keyword.sentiment.score}, Label: ${keyword.sentiment.label}`
      //   );
      //   console.log("Emotion:", keyword.emotion);
      //   console.log("Relevance:", keyword.relevance);
      //   console.log("Count:", keyword.count);
      // }
      //   console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch((err) => {
      console.log("error:", err);
    });
  });
}


// create a txt file from an audio file
function getSpeechToText() {
  const apiKey = "w8ClcQkBBum8anBv2v1Cwnvd2_T30ywjw7QCfGh6AcF3";
  const serviceURL =
    "https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/fd9fa94f-db7f-48cd-b5df-c558fd6fbc8b";

  // audioFile = getAudioFile();
  audioFile = 'storeChat.mp3'

  // Create a readable stream from the audio file
  const audioStream = fs.createReadStream(audioFile);

  // Define the API endpoint and parameters
  const apiUrl = `${serviceURL}/v1/recognize`;
  const queryParameters = {
    model: "en-US_NarrowbandModel",
  };

  // Set the headers for the API request
  const headers = {
    "Content-Type": "audio/mp3",
  };

  // Make the POST request to the Watson Speech to Text service
  axios
    .post(apiUrl, audioStream, {
      params: queryParameters,
      headers: headers,
      auth: {
        username: "apikey",
        password: apiKey,
      },
    })
    .then((response) => {
      txtFile = response.data.results[0].alternatives[0].transcript;
      // getSentimentReport(txtFile);
      return getSentimentReport(txtFile)
      //   console.log(response.data.results[0].alternatives[0].transcript);
      //   console.log(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function MainApp() {
  try {
    const sentimentReport = await getSpeechToText();
    return await sentimentReport;
  } catch (error) {
    throw error;
  }
}

// MainApp();

// Exporting functions
module.exports = { getSentimentReport, getSpeechToText, getAudioFile, MainApp };
