// src/PolynomialChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const PolynomialChart2 = ({ polynomialData, functionData }) => {
  const data = {
    labels: polynomialData.map((_, index) => (index * 0.1 - 10).toFixed(1)), // Generar labels basados en el rango de x
    datasets: [
      {
        label: "Polynomial",
        data: polynomialData,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Function",
        data: functionData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        beginAtZero: true,
        min: -1000,
        max: 1000,
      },
    },
  };

  return (
    <>
      <div>.</div>
      <Line data={data} options={options} />
    </>
  );
};

export default PolynomialChart2;
