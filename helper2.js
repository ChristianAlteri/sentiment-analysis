const { IamAuthenticator } = require("ibm-watson/auth");
const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const fs = require("fs");
const axios = require("axios");
const { model } = require("mongoose");
const path = require("path");

async function processAudioAndGenerateSentimentReport() {
  
  try {
    // Step 1: Get the audio file (replace with your actual logic)
    const audioFilePath = path.join(__dirname, "storeChat.mp3");

    // Step 2: Convert audio to text using Watson Speech to Text
    const apiKey = "w8ClcQkBBum8anBv2v1Cwnvd2_T30ywjw7QCfGh6AcF3";
    const serviceURL =
      "https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/fd9fa94f-db7f-48cd-b5df-c558fd6fbc8b";

    // Create a readable stream from the audio file
    const audioStream = fs.createReadStream(audioFilePath);

    // Define the API endpoint and parameters
    const apiUrl = `${serviceURL}/v1/recognize`;
    const queryParameters = {
      model: "en-US_NarrowbandModel",
    };

    // Set the headers for the API request
    const headers = {
      "Content-Type": "audio/mp3",
    };

    const speechToTextResponse = await axios.post(apiUrl, audioStream, {
      params: queryParameters,
      headers: headers,
      auth: {
        username: "apikey",
        password: apiKey,
      },
    });

    const transcript = speechToTextResponse.data.results[0].alternatives[0].transcript;

    // Step 3: Get sentiment report using Watson Natural Language Understanding
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: "2022-04-07",
      authenticator: new IamAuthenticator({
        apikey: "PqUfyZLghyP9CDvAIt0O1S0GcYlGl5xnrrqm6v6xs_yB",
      }),
      serviceUrl:
        "https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/5fbfbe6e-0f7d-4f5e-959d-23324008a8aa",
    });

    const analyzeParams = {
      text: transcript,
      features: {
        keywords: {
          sentiment: true,
          emotion: true,
          limit: 15,
        },
      },
    };

    const sentimentReport = await naturalLanguageUnderstanding.analyze(analyzeParams);
    return sentimentReport.result.keywords;
  } catch (error) {
    throw error;
  }
}

// Example usage
async function MainApp2() {
  console.log("main app 2");
  try {
    const sentimentReport = await processAudioAndGenerateSentimentReport();
    return sentimentReport;
    // console.log("Sentiment Report:", sentimentReport);
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = {
  MainApp2,
};

// MainApp(); // Uncomment this to run the main application
