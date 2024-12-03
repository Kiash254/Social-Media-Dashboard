// frontend/src/DashboardCharts.js
import React from 'react';
import { Bar, Pie, Scatter, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function DashboardCharts({ accounts, posts }) {
    const barData = {
        labels: accounts.map(account => account.platform),
        datasets: [
            {
                label: 'Followers',
                data: accounts.map(account => account.followers),
                backgroundColor: ['#3b5998', '#00acee', '#C13584'],
            },
        ],
    };

    const pieData = {
        labels: accounts.map(account => account.platform),
        datasets: [
            {
                label: 'Number of Posts',
                data: accounts.map(account => account.number_of_posts),
                backgroundColor: ['#3b5998', '#00acee', '#C13584'],
            },
        ],
    };

    const scatterData = {
        datasets: [
            {
                label: 'Posts vs Followers',
                data: accounts.map(account => ({ x: account.number_of_posts, y: account.followers })),
                backgroundColor: '#00acee',
            },
        ],
    };

    const lineData = {
        labels: posts.map(post => new Date(post.scheduled_time).toLocaleDateString()),
        datasets: [
            {
                label: 'Posts Over Time',
                data: posts.map(post => post.id),
                borderColor: '#3b5998',
                fill: false,
            },
        ],
    };

    return (
        <div className="my-4">
            <h2 className="text-center">Social Media Statistics</h2>
            <Bar data={barData} />
            <Pie data={pieData} />
            <Scatter data={scatterData} />
            <Line data={lineData} />
        </div>
    );
}

export default DashboardCharts;