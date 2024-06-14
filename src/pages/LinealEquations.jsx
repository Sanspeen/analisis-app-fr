import { useState } from "react";
import { Link } from "react-router-dom";
import MatrixInput from "../components/MatrixInput";
import "../css/lineal.css";

export default function LinealEquations() {
  const options = [
    {
      label: "Pivoteo",
      value: "pivoteo",
    },
    {
      label: "Eliminación gaussiana",
      value: "eliminacion-g",
    },
    {
      label: "Gauss Seidel",
      value: "gauss-seidel",
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState(options[0].value);
  const [tolerance, setTolerance] = useState(0);

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div className="equations-container">
      <Link to="/" className="back-button">
        {"←"}
      </Link>
      <h1>Ecuaciones Lineales</h1>
      <label>Elegir método:</label>
      <select value={selectedMethod} onChange={handleMethodChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedMethod === "gauss-seidel" && (
        <div>
          <label htmlFor="toleranceInput">Tolerancia: </label>
          <input
            id="toleranceInput"
            type="number"
            step="any"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
          />
        </div>
      )}

      <MatrixInput selectedMethod={selectedMethod} />
    </div>
  );
}
