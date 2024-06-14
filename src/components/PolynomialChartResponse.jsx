// src/PolynomialChartResponse.js
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

const PolynomialChartResponse = ({ dataPoints }) => {
  const data = {
    labels: dataPoints.map((_, index) => index.toString()),
    datasets: [
      {
        label: "Polynomial",
        data: dataPoints,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
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

export default PolynomialChartResponse;
