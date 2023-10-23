

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// import Swiper from 'swiper';

import 'swiper/css';


const ChartComponent = () => {


const data = [
  {
    keyword: "great trucks tops",
    sentiment: {
      score: 0.990647,
      label: "positive",
    },
    emotion: {
      sadness: 0.013183,
      joy: 0.923177,
      fear: 0.007502,
      disgust: 0.003913,
      anger: 0.011148,
    },
    relevance: 0.886171,
    count: 1,
  },
  {
    keyword: "lot of men",
    sentiment: {
      score: 0.990647,
      label: "positive",
    },
    emotion: {
      sadness: 0.013183,
      joy: 0.523177,
      fear: 0.007502,
      disgust: 0.003913,
      anger: 0.011148,
    },
    relevance: 0.677188,
    count: 1,
  },
  {
    keyword: "bags",
    sentiment: {
      score: 0.090647,
      label: "positive",
    },
    emotion: {
      sadness: 0.513183,
      joy: 0.223177,
      fear: 0.007502,
      disgust: 0.003913,
      anger: 0.011148,
    },
    relevance: 0.677188,
    count: 1,
  }
];


const chartRef = useRef(null);

  useEffect(() => {
    // Find the labels (x-axis) and data (y-axis)
    const labels = data.map((item) => item.keyword.charAt(0).toUpperCase() + item.keyword.slice(1));
    const sentimentScores = data.map((item) => item.emotion.joy.toFixed(3) * 100);
    const emotionScores = data.map((item) => item.emotion.sadness.toFixed(3) * 100);

    // Get the canvas element for the chart
    const ctx = document.getElementById("barChart");

    // Check if a Chart instance already exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new Chart instance and store it in the ref
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Positive Sentiment",
            data: sentimentScores,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Negative Sentiment",
            data: emotionScores,
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            borderColor: "rgba(255, 0, 0, 1.0)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          },
        },
      },
    });
  }, [data]);

  return (
    <div
    className="
      flex
      flex-col
      justify-center
      text-center
      h-30vh
    ">
      <h1 className="
        text-l
        font-semibold
        text-center

      "
      >
      Keyword Sentiment Analysis
      </h1>
      <div className="
      
      ">
        <canvas id="barChart"></canvas>
      </div>
    </div>
  );
}

export default ChartComponent;
