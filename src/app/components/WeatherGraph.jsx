"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherGraph = ({ weatherData }) => {
  if (!weatherData || !weatherData.daily) {
    return <p>No data available to display</p>;
  }

  const { time, temperature_2m_max, temperature_2m_min, temperature_2m_mean } = weatherData.daily;

  // handling null values from data
  const cleanData = (data) => data.map((value) => (value !== null ? value : 0));

  const chartData = {
    //dates are representing on x asis
    labels: time, 
    datasets: [
      {
        label: "Max Temperature (°C)",
        //temperatures are representing on y axis
        data: cleanData(temperature_2m_max), 
        borderColor: "rgba(255, 20, 147, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4, 
      },
      {
        label: "Min Temperature (°C)",
        data: cleanData(temperature_2m_min),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Mean Temperature (°C)",
        data: cleanData(temperature_2m_mean),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Temperatures",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature in (°C)",
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg m-10">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default WeatherGraph;
