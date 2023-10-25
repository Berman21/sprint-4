import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
)

export function BarChart() {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            // x: { display: false },
            y: { display: false },
        },
    }

    const labels = ['July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan']

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 7, 2, 25, 4, 30],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }

    return (
        <div style={{ maxWidth: '20vw', margin: 'auto' }}>
            <Bar options={options} data={data} />
        </div>
    )

}
