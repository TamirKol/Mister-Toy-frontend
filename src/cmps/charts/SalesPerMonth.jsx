import React from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale, PointElement,LineElement, Title, Tooltip,  Legend} from 'chart.js'
import { Line } from 'react-chartjs-2';
import { utilService } from '../../services/util.service.js';
ChartJS.register( CategoryScale, LinearScale,PointElement, LineElement, Title,Tooltip,Legend);

export function SalesPerMonth({getRandomIntInclusive}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Per Month',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: '2022',
                data: labels.map(() => utilService.getRandomIntInclusive(0,1000)),
                borderColor: '#FFC75F',
                backgroundColor: '#FFC75F',
            },
            {
                label: '2023',
                data: labels.map(() => utilService.getRandomIntInclusive(0,1000)),
                borderColor: '#94d2bd',
                backgroundColor: '#94d2bd',
            },
        ],
    };

    return <Line options={options} data={data} />;
}
