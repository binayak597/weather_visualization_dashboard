"use client";

import React, { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const WeatherTable = ({ weatherData }) => {
  const rowsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);

  if (!weatherData || !weatherData.daily) {
    return <p>No data available to display</p>;
  }

  const { time, temperature_2m_max, temperature_2m_min, temperature_2m_mean } = weatherData.daily;

  
  const rows = time.map((date, index) => ({
    date,
    maxTemp: temperature_2m_max[index] || "N/A",
    minTemp: temperature_2m_min[index] || "N/A",
    meanTemp: temperature_2m_mean[index] !== null ? temperature_2m_mean[index] : "N/A",
  }));

  // calculating total pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // retrieve data for the current page
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg ">
      <h2 className="text-lg font-semibold mb-4">Weather Data Table</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Max Temp (°C)</th>
            <th className="border border-gray-300 px-4 py-2">Min Temp (°C)</th>
            <th className="border border-gray-300 px-4 py-2">Mean Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{row.date}</td>
              <td className="border border-gray-300 px-4 py-2">{row.maxTemp}</td>
              <td className="border border-gray-300 px-4 py-2">{row.minTemp}</td>
              <td className="border border-gray-300 px-4 py-2">{row.meanTemp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div className="flex flex-col justify-center items-center mt-4">

        <div className="text-gray-700">
          <strong className="text-xl">{currentPage}/{totalPages}</strong>
        </div>
        <div className="mt-2 flex gap-4">
          <button
            className="px-4 py-2 bg-gray-400 rounded-xl disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ArrowBackIosNewIcon />
          </button>

          <button
          className="px-4 py-2 bg-gray-400 rounded-xl disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosIcon />
          </button>
        </div>
        
        
       
      </div>
    </div>
  );
};

export default WeatherTable;
