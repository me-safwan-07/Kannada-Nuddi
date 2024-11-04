import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DashboardMonthData = () => {
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
        <div className="">
            <div className="">
                <div className="">
                    {/* Conditionally render totalBlogs */}
                    <p>{stats ? stats.totalBlogs : 'Loading...'}</p>
                </div>

                <div className="">
                    <ul>
                        {/* Conditionally render blogViewsPerMonth */}
                        {stats && stats.blogViewsPerMonth.map((monthData) => (
                            <li key={monthData._id.month}>
                                    Month: {monthData._id.month}, Views: {monthData.totalViews},
                                    Blogs: {monthData.totalBlogs}
                            </li>
                        ))} 
                    </ul>
                </div>
            </div>
        </div>
    );
}
