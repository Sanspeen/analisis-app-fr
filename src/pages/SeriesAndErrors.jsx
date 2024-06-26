import "../css/seriesAndErrors.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PolynomialChart2 from "../components/PolynomialChart2";
import { URL_BASE } from "../constants";
import { useState } from "react";
import * as math from "mathjs";

export default function SeriesAndErrors() {
  const options = [
    {
      label: "Taylor",
      value: "taylor",
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState("taylor");
  const [functionValue, setFunctionValue] = useState("");
  const [x0, setX0] = useState("");
  const [numIteraciones, setNumIteraciones] = useState("");
  const [response, setResponse] = useState(null);
  const [polynomialData, setPolynomialData] = useState([]);
  const [functionData, setFunctionData] = useState([]);

  const solveEquation = () => {
    const data = {
      function: functionValue,
      x0: parseFloat(x0),
      num_iteraciones: parseInt(numIteraciones),
    };

    axios({
      method: "POST",
      url: `${URL_BASE}/series-${selectedMethod}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((response) => {
        const coefficients = response.data.coefficients;
        setResponse(coefficients);

        // Calculate polynomial data
        const polyData = calculatePolynomialData(coefficients, parseFloat(x0), parseFloat(x0 + 1), 0.1);
        setPolynomialData(polyData);

        // Calculate function data
        const funcData = calculateFunctionData(functionValue, parseFloat(x0), parseFloat(x0 + 1), 0.1);
        setFunctionData(funcData);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const calculatePolynomialData = (coefficients, min, max, step) => {
    const data = [];
    for (let x = min; x <= max; x += step) {
      let y = 0;
      coefficients.forEach((coef, index) => {
        y += coef * Math.pow(x, index);
      });
      data.push(y);
    }
    return data;
  };

  const calculateFunctionData = (func, min, max, step) => {
    const data = [];
    const sanitizedFunc = func.replace('**', '^');
    const parsedFunc = math.parse(sanitizedFunc).compile();
    for (let x = min; x <= max; x += step) {
      let y = parsedFunc.evaluate({ x });
      data.push(y);
    }
    return data;
  };

  return (
    <div className="series-errors-container">
      <Link to="/" className="back-button">
        {"←"}
      </Link>
      <h1>Series de Taylor y Errores</h1>
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
        <label htmlFor="x0Input">x0: </label>
        <input
          id="x0Input"
          type="number"
          value={x0}
          onChange={(e) => setX0(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="numIteracionesInput">Grado Polinomial: </label>
        <input
          id="numIteracionesInput"
          type="number"
          value={numIteraciones}
          onChange={(e) => setNumIteraciones(e.target.value)}
        />
      </div>

      <button onClick={solveEquation}>Run</button>
      {response && (
        <PolynomialChart2 polynomialData={polynomialData} functionData={functionData} className="response" />
      )}
    </div>
  );
}

