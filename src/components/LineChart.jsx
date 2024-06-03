import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ iteraciones, valores_iteracion }) => {
    // Crear un array de números desde 0 hasta iteraciones
    const labels = valores_iteracion; 

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Valores de Iteración',
                data:Array.from({ length: iteraciones }, (_, index) => index),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options}></Line>;
};

export default LineChart;