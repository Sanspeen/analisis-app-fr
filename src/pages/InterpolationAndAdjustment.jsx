import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/interpolacion.css";
import { URL_BASE } from "../constants";
import PolynomialChartResponse from "../components/PolynomialChartResponse";

export default function InterpolationAndAdjustment() {
  const options = [
    {
      label: "Lagrange",
      value: "lagrange",
    },
    {
      label: "Mínimos Cuadrados",
      value: "minimos-cuadrados",
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState(options[0].value);
  const [listA, setListA] = useState("");
  const [listB, setListB] = useState("");
  const [listPredict, setListPredict] = useState("");
  const [resultAprox, setResultAprox] = useState(null);
  const [resultPolinomio, setResultPolinomio] = useState(null);
  const [intercepto, setIntercepto] = useState(null);
  const [pendiente, setPendiente] = useState(null);

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    // Clear previous results
    setResultAprox(null);
    setResultPolinomio(null);
    setIntercepto(null);
    setPendiente(null);
  };

  const solveEquation = () => {
    let data = {
      list_a: listA.split(",").map(Number),
      list_b: listB.split(",").map(Number),
    };

    if (selectedMethod === "lagrange") {
      data = {
        ...data,
        list_predict: listPredict.split(",").map(Number),
      };
    }

    axios({
      method: "POST",
      url: URL_BASE + `/interpolacion-${selectedMethod}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((response) => {
        console.log(response);
        if (selectedMethod === "lagrange") {
          setResultAprox(response.data.result_aprox);
          setResultPolinomio(response.data.result_polinomio);
        } else if (selectedMethod === "minimos-cuadrados") {
          setIntercepto(response.data.intercepto);
          setPendiente(response.data.pendiente);
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  return (
    <div className="interpolation-container">
      <Link to="/" className="back-button">
        {"←"}
      </Link>
      <h1>Interpolación y Ajuste</h1>
      <label>Elegir método:</label>
      <select value={selectedMethod} onChange={handleMethodChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="listAInput">Lista A: </label>
        <input
          id="listAInput"
          type="text"
          value={listA}
          onChange={(e) => setListA(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="listBInput">Lista B: </label>
        <input
          id="listBInput"
          type="text"
          value={listB}
          onChange={(e) => setListB(e.target.value)}
        />
      </div>
      {selectedMethod === "lagrange" && (
        <div>
          <label htmlFor="listPredictInput">Lista de Predicción: </label>
          <input
            id="listPredictInput"
            type="text"
            value={listPredict}
            onChange={(e) => setListPredict(e.target.value)}
          />
        </div>
      )}
      <button onClick={solveEquation}>Run</button>
      {resultPolinomio && (
        <div>
          <h2>Resultados Polinómicos</h2>
          <PolynomialChartResponse dataPoints={resultPolinomio} />
        </div>
      )}
      {resultAprox && (
        <div>
          <h2>Resultados de Aproximación</h2>
          <table>
            <thead>
              <tr>
                <th>Índice</th>
                <th>Valor Aproximado</th>
              </tr>
            </thead>
            <tbody>
              {resultAprox.map((value, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {intercepto !== null && pendiente !== null && (
        <div>
          <h2>Resultados de Mínimos Cuadrados</h2>
          <p>Intercepto: {intercepto}</p>
          <p>Pendiente: {pendiente}</p>
        </div>
      )}
    </div>
  );
}
