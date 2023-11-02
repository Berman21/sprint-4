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
            x: {
                grid: {
                    display: false
                },
                barThickness: 100,
            },
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false
        // barLayout: {
        //     padding: {
        //         left: 30,
        //     }
        // },
    };

    const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [3700, 5100, 2000, 3500, 4100, 2500, 4000, 1600, 3100, 4050, 2000, 4800,],
                backgroundColor: 'rgba(255, 56, 92, 0.9)',
            },
        ],
        // borderWidth: 3,
        // barThickness: 30
    }

    // const config = {
    // type: 'bar',
    // data: data,
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     },
    // };

    return (
        <div>
            <div style={{ width: '95%', maxHeight: '80%' }} >
                <h1>Revenue / month</h1>
                <Bar options={options} data={data} />
            </div >
        </div>
    )

}
