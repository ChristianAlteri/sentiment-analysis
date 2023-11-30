import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const ChartComponent = () => {
  const [data, setData] = useState(null); // Initialize data as null for the loading state

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get-fetched-data");
      const fetchedData = response.data;
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartRef = useRef(null);

  useEffect(() => {
    if (data) { // Check if data is available
      const latestEntry = data[data.length - 1];
      const labels = latestEntry.data.map((item) => item.text);
      const sentimentScores = latestEntry.data.map((item) => (item.emotion.joy * 100).toFixed(3));
      const emotionScores = latestEntry.data.map((item) => (item.emotion.sadness * 100).toFixed(3));

      console.log(data);
      const ctx = document.getElementById("barChart");

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
              max: 100,
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center text-center h-30vh">
      <h1 className="text-l font-semibold text-center">
        Keyword Sentiment Analysis
      </h1>
      {data ? ( // Render the chart when data is available
        <div className="flex justify-center">
          <canvas id="barChart"></canvas>
        </div>
      ) : ( // Display a loading message while waiting for data
        <p>Loading data...</p>
      )}
      <button onClick={fetchData}>Refresh Data</button>
    </div>
  );
}

export default ChartComponent;
