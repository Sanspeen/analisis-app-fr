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

const LineChartDiffEQ = ({ iteraciones, valores_iteracion }) => {
  const labels = valores_iteracion;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Valores de Iteración",
        data: iteraciones,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
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

  return (
    <>
      <div></div>
      <Line data={data} options={options}></Line>
    </>
  );
};

export default LineChartDiffEQ;
