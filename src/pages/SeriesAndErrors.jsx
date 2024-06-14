import "../css/seriesAndErrors.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PolynomialChart from "../components/PolynomialChart";
import { URL_BASE } from "../constants";
import { useState } from "react";

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

  const solveEquation = () => {
    const data = {
      function: functionValue,
      x0: parseFloat(x0),
      num_iteraciones: parseInt(numIteraciones),
    };

    console.log(data);

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
        console.log(response);
        setResponse(response.data.coefficients); // Guardar la respuesta en el estado
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <div className="series-errors-container">
      <Link to="/" className="back-button">
        {"←"}
      </Link>
      <h1>Series de Taylor y errores</h1>
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
        <label htmlFor="numIteracionesInput">Número de Iteraciones: </label>
        <input
          id="numIteracionesInput"
          type="number"
          value={numIteraciones}
          onChange={(e) => setNumIteraciones(e.target.value)}
        />
      </div>

      <button onClick={solveEquation}>Run</button>

      {response && (
        <PolynomialChart coefficients={response} className="response" />
      )}
    </div>
  );
}
