import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoLocationSharp } from "react-icons/io5";
import { LuCloudSunRain } from "react-icons/lu";
import { states } from '../data';

function WeatherFinder() {
    const [dateTime, setDateTime] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [currentStateIndex, setCurrentStateIndex] = useState(0);
    
    const apiKey = '5fe4eee35594b9103d517262afb226f8'; // Ensure you set your API key here

    useEffect(() => {
        const fetchWeather = async () => {
            const state = states[currentStateIndex];
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${state},IN&appid=${apiKey}&units=metric`
                );
                setWeatherData({
                    name: response.data.name,
                    temp: response.data.main.temp,
                });
            } catch (error) {
                console.error("Error fetching the weather data:", error);
            }
        };

        fetchWeather();
        const intervalId = setInterval(() => {
            setCurrentStateIndex((prevIndex) => (prevIndex + 1) % states.length);
        }, 10000); // Change state every 10 seconds

        return () => clearInterval(intervalId);
    }, [currentStateIndex, apiKey]);

    useEffect(() => {
        const updateDateTime = () => {
            const currentDate = new Date();
            const optionsDate = { 
                weekday: 'short', // Short format for the day (e.g., "Sat")
                month: 'short',   // Short format for the month (e.g., "Oct")
                day: '2-digit',   // Two-digit day (e.g., "05")
                year: 'numeric'    // Full year (e.g., "2024")
            };
            const optionsTime = { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            };

            const formattedDate = currentDate.toLocaleDateString('en-US', optionsDate);
            const formattedTime = currentDate.toLocaleTimeString('en-US', optionsTime);
            
            setDateTime(`${formattedDate} | ${formattedTime}`);
        };

        updateDateTime(); // Set the initial date and time
        const intervalId = setInterval(updateDateTime, 1000); // Update every second

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex items-center space-x-1 md-hidden">
            <span className="text-sm text-gray-700">{dateTime} | </span>
            <IoLocationSharp className="text-black" />
            <span className="text-sm text-gray-700">{weatherData.name}</span>
            <LuCloudSunRain className="text-yellow-500" />
            <span className="text-sm text-gray-700 ">{weatherData.temp} °C</span>
        </div>
    );
}

export default WeatherFinder;
