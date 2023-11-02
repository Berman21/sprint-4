import React, { Fragment } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
    const data = {
        labels: ['Pending', 'Approved', 'Rejected'],
        datasets: [
            {
                label: '# of Votes',
                data: [30, 20, 10],
                pointStyle: 'circle',
                backgroundColor: [
                    'rgba(255, 166, 0, 0.2)',
                    'rgba(101, 191, 56, 0.2)',
                    'rgba(245, 107, 107, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 166, 0, 1)',
                    'rgba(101, 191, 56, 1)',
                    'rgba(245, 107, 107, 1)',
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
            <h1>Reservations status</h1>
            <div style={{ maxWidth: '90%', maxHeight: '90%', alignSelf: 'center' }}>
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
