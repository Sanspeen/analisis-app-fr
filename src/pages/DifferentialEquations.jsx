import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import LineChartDiffEQ from "../components/LineChartDiffEQ";
import "../css/diferenciales.css";
import { URL_BASE } from "../constants";

export default function DifferentialEquations() {
  const options = [
    { label: "Kutta", value: "kutta" },
    { label: "Euler", value: "euler" },
  ];

  const [selectedMethod, setSelectedMethod] = useState(options[0].value);
  const [functionValue, setFunctionValue] = useState("");
  const [limInferior, setLimInferior] = useState("");
  const [limSuperior, setLimSuperior] = useState("");
  const [initConditions, setInitConditions] = useState("");
  const [integrationStep, setIntegrationStep] = useState("");
  const [chartData, setChartData] = useState({ tiempo: [], yeu: [] });

  const solveEquation = () => {
    const initConditionsArray = initConditions.split(",").map(Number);

    const data = {
      function: functionValue,
      lim_inferior: parseFloat(limInferior),
      lim_superior: parseFloat(limSuperior),
      init_conditions: initConditionsArray,
      integration_step: parseFloat(integrationStep),
    };

    axios({
      method: "POST",
      url: URL_BASE + `/diff-eq-${selectedMethod}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data,
    })
      .then((response) => {
        console.log(response.data);
        const { tiempo, yeu } = response.data;
        setChartData({ tiempo, yeu });
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <div className="differential-container">
      <Link to="/" className="back-button">
        {"←"}
      </Link>
      <h1>Ecuaciones Diferenciales</h1>
      <label>Elegir método:</label>
      <select
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="functionInput">Función: </label>
        <input
          id="functionInput"
          type="text"
          value={functionValue}
          onChange={(e) => setFunctionValue(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="limInferiorInput">Límite Inferior: </label>
        <input
          id="limInferiorInput"
          type="number"
          value={limInferior}
          onChange={(e) => setLimInferior(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="limSuperiorInput">Límite Superior: </label>
        <input
          id="limSuperiorInput"
          type="number"
          value={limSuperior}
          onChange={(e) => setLimSuperior(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="initConditionsInput">Condiciones Iniciales: </label>
        <input
          id="initConditionsInput"
          type="text"
          value={initConditions}
          onChange={(e) => setInitConditions(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="integrationStepInput">Paso de Integración: </label>
        <input
          id="integrationStepInput"
          type="number"
          step="any"
          value={integrationStep}
          onChange={(e) => setIntegrationStep(e.target.value)}
        />
      </div>
      <button onClick={solveEquation}>Run</button>
      {chartData.tiempo.length > 0 && (
        <LineChartDiffEQ
          iteraciones={chartData.yeu}
          valores_iteracion={chartData.tiempo}
        />
      )}
    </div>
  );
}
