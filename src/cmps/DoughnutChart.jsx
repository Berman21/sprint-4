import React, { Fragment } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
    const data = {
        labels: ['Red', 'Blue', 'Green', 'Purple'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 7, 2],
                pointStyle: 'circle',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
                // position: 'right',

                labels: {
                    // usePointStyle: true,
                    // boxWidth: 40,
                },
            },
        },
    };

    return (
        <div className='doughnut-chart-container'>
            <div style={{ maxWidth: '90%', maxHeight: '90%' }}>
                <h1>Reservations status</h1>
                <Doughnut data={data} options={options} />
            </div>
            <div className='chart-stats'>
                <article className='pending-stat'>
                    <p>pending</p>
                    <span>30</span>
                </article>
                <article className='approved-stat'>
                    <p>approved</p>
                    <span>20</span>
                </article >
                <article className='rejected-stat'>
                        <p>rejected</p>
                        <span>10</span>
                </article>
            </div>
        </div>
    )
}
