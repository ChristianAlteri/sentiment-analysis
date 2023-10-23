const { IamAuthenticator } = require("ibm-watson/auth");

const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");

const fs = require("fs");
const axios = require("axios");

function getSpeechToText() {
    const apiKey = "w8ClcQkBBum8anBv2v1Cwnvd2_T30ywjw7QCfGh6AcF3";
    const serviceURL =
      "https://api.au-syd.speech-to-text.watson.cloud.ibm.com/instances/fd9fa94f-db7f-48cd-b5df-c558fd6fbc8b";
  
    // audioFile = getAudioFile();
  
    // Create a readable stream from the audio file
    const audioStream = 'http://localhost:3000/94570461-a6d0-4acc-9e29-a235fff0dda0'
  
    // Define the API endpoint and parameters
    const apiUrl = `${serviceURL}/v1/recognize`;
    const queryParameters = {
      model: "en-US_NarrowbandModel",
      contentType: 'audio/mpeg',
    };
  
    // Set the headers for the API request
    const headers = {
      "Content-Type": "audio/mpeg",
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
          console.log(response.data.results[0].alternatives[0].transcript);
        //   console.log(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getSpeechToText();