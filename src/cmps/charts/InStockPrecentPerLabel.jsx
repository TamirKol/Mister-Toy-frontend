import React from "react";
import { Chart as ChartJS,CategoryScale,LinearScale, BarElement, Tooltip, Legend, Title } from 'chart.js';
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale,LinearScale,BarElement,Tooltip,Legend,Title)
export function InStockPrecentPerLabel({toys, inStockPercentByLabel}){
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Availability Percent By Label',
            },
        },
    };
    const labels = inStockPercentByLabel.map(toy => toy.label)
    const data = {
        labels,
        datasets: [
            {
                label: 'Percentage of toys in stock',
                data: labels.map(label => inStockPercentByLabel.find(l => l.label === label).percentage),
                backgroundColor:
                [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ]
            
            },

        ],
    }

    return <Bar options={options} data={data} />;
}