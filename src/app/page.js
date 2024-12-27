
"use client";

import { useState } from "react";
import WeatherGraph from "./components/WeatherGraph";
import WeatherTable from "./components/WeatherTable";

export default function Home() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {

    setLoading(true);
    setIsError('');
    try {
      const res = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean&timezone=auto`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();

      if(data.error) throw new Error(data.error);
      setWeatherData(data);
    } catch (err) { 

      setIsError(err.message);
    } finally { 

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-5">Weather Dashboard</h1>
      <form className="min-w-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-3 mb-5">
        <input
          type="number"
          placeholder="Latitude"
          className="px-4 py-2 outline-none rounded-xl border border-gray-300 focus:border-2 focus:border-gray-500"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Longitude"
          className="px-4 py-2 outline-none rounded-xl border border-gray-300 focus:border-2 focus:border-gray-500"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 outline-none rounded-xl border border-gray-300 focus:border-2 focus:border-gray-500"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 outline-none rounded-xl border border-gray-300 focus:border-2 focus:border-gray-500"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </form>
      <button
        onClick={fetchWeatherData}
        className="w-1/4 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? "Loading" : "Get"}
      </button>
      {isError && <p className="text-red-500 mt-3">{isError}</p>}
      {/* {weatherData && (
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-3">Weather Data</h2>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )} */}

      <div className="w-full max-w-4xl">
        {weatherData && (
          <>
            
            <WeatherGraph weatherData={weatherData}/>
            <WeatherTable weatherData={weatherData} />
          </>
        )}
        {isError && <p className="text-red-500 mt-3">{isError}</p>}
      </div>

    </div>
  );
}
