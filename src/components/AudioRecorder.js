import React from "react";

import { useState, useRef } from "react";

const mimeType = "audio/mp3";

const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  const startRecording = async () => {
    setRecordingStatus("recording");
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {

        //creates a playable URL from the blob file.
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: mimeType });
          console.log("audioBlob", audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudio(audioUrl);
  
      // Create a FormData object to send the audio data
      const formData = new FormData();
      formData.append("audio", audioBlob);

  
    //   try {
    //     const response = await fetch('http://localhost:3001/api/upload-audio', {
    //       method: "POST",
    //       body: formData,
    //     });
  
    //     if (response.ok) {

    //       console.log('hit endpoint ok', response);
    //     } else {
    //       console.log('ERROR');
    //     }
    //   } catch (error) {
    //     console.error(error);

    //   }
  
      setAudioChunks([]);
    };
  };
  console.log(audio);

  return (
    <div
      className="border-2 border-gray-200 rounded-lg shadow-lg p-4 m-4"
    >
      <h2
        className="
            font-semibold
            "
      >
        Audio Recorder
      </h2>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <button onClick={getMicrophonePermission} type="button">
              Get Microphone
            </button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <button onClick={startRecording} type="button">
              Start Recording
            </button>
          ) : null}
          {recordingStatus === "recording" ? (
            <button onClick={stopRecording} type="button">
              Stop Recording
            </button>
          ) : null}
        </div>
        {audio ? (
          <div className="audio-container">
            <audio src={audio} controls></audio>
            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
      </main>
    </div>
  );
};
export default AudioRecorder;


