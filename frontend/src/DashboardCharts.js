// frontend/src/DashboardCharts.js
import React from 'react';
import { Bar, Pie, Scatter, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Row, Col } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function DashboardCharts({ accounts, posts }) {
    const followersData = {
        labels: accounts.map(account => account.username),
        datasets: [
            {
                label: 'Followers',
                data: accounts.map(account => account.followers),
                backgroundColor: ['#3b5998', '#00acee', '#C13584'],
            },
        ],
    };

    const postsData = {
        labels: posts.map(post => new Date(post.scheduled_time).toLocaleDateString()),
        datasets: [
            {
                label: 'Posts',
                data: posts.map(post => post.content.length),
                backgroundColor: '#00acee',
            },
        ],
    };

    const scatterData = {
        datasets: [
            {
                label: 'Posts Length vs Followers',
                data: posts.map(post => ({
                    x: accounts.find(account => account.id === post.account).followers,
                    y: post.content.length,
                })),
                backgroundColor: '#C13584',
            },
        ],
    };

    const lineData = {
        labels: posts.map(post => new Date(post.scheduled_time).toLocaleDateString()),
        datasets: [
            {
                label: 'Posts Over Time',
                data: posts.map(post => post.content.length),
                borderColor: '#3b5998',
                fill: false,
            },
        ],
    };

    return (
        <div className="my-4">
            <h2 className="text-center">Social Media Statistics</h2>
            <Row>
                <Col md={6}>
                    <Bar data={followersData} />
                </Col>
                <Col md={6}>
                    <Pie data={followersData} />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Scatter data={scatterData} />
                </Col>
                <Col md={6}>
                    <Line data={lineData} />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Bar data={postsData} />
                </Col>
            </Row>
        </div>
    );
}

export default DashboardCharts;