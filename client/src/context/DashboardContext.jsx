// context/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const [stats, setStats] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/blog/stats');
                setStats(res.data);
            } catch (err) {
                console.error('Error Fetching DashboardMonthData data:', err);
            }
        }
        fetchStats();
    }, []);

    return (
        <DashboardContext.Provider value={{ stats }}>
            {children}
            {/* {error && <div className="error-message">{error}</div>} Display error message */}
        </DashboardContext.Provider>
    );
};

export default DashboardProvider;
