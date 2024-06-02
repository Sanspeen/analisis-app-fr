// src/PolynomialChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PolynomialChart = () => {
    // Generar datos del polinomio
    const generatePolynomialData = (coefficients, xRange) => {
        const data = [];
        for (let x = xRange.min; x <= xRange.max; x += xRange.step) {
            let y = 0;
            coefficients.forEach((coef, index) => {
                y += coef * Math.pow(x, index);
            });
            data.push({ x, y });
        }
        return data;
    };

    // Coeficientes del polinomio (ej. y = x^3 - 4x^2 + 2x - 1)
    const coefficients = [-1, 2, -4, 1];
    const xRange = { min: -10, max: 10, step: 0.1 };
    const polynomialData = generatePolynomialData(coefficients, xRange);

    const data = {
        labels: polynomialData.map(point => point.x.toFixed(1)),
        datasets: [
            {
                label: 'Polynomial',
                data: polynomialData.map(point => point.y),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default PolynomialChart;
