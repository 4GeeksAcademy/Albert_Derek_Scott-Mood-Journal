import React, { useEffect, useState } from 'react';

const AnalyticsDashboard = () => {
    const [loginDays, setLoginDays] = useState(0);
    const userId = /* The ID of the user - fetched from session or context */

    useEffect(() => {
        fetchUserLoginData(userId).then(dates => {
            const uniqueDays = new Set(dates.map(date => new Date(date).toDateString()));
            setLoginDays(uniqueDays.size);
        });
    }, [userId]);

    const fetchUserLoginData = async (userId) => {
        try {
            // Replace with your actual API call
            const response = await fetch(`path/to/your/api/user-logins/${userId}`);
            const data = await response.json();
            return data.loginDates; // assuming the API returns an object with a 'loginDates' array
        } catch (error) {
            console.error('Error fetching user login data:', error);
            return [];
        }
    };

    return (
        <div>
            <h1>Analytics Dashboard</h1>
            <p>Number of Days Logged In: {loginDays}</p>
        </div>
    );
};

export default AnalyticsDashboard;
