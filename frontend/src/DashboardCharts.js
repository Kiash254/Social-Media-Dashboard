// frontend/src/DashboardCharts.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

function DashboardCharts() {
    const data = {
        labels: ['Facebook', 'Twitter', 'Instagram'],
        datasets: [
            {
                label: 'Followers',
                data: [1200, 1900, 800],
                backgroundColor: ['#3b5998', '#00acee', '#C13584'],
            },
        ],
    };

    return (
        <div className="my-4">
            <h2 className="text-center">Social Media Statistics</h2>
            <Bar data={data} />
        </div>
    );
}

export default DashboardCharts;