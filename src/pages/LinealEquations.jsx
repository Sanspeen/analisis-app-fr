import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MatrixInput from '../components/MatrixInput';

export default function LinealEquations() {
  const options = [
    {
      label: "Eliminacion gaussiana",
      value: "eliminacion-g",
    },
    {
      label: "Gauss Seidel",
      value: "gauss-seidel",
    }
  ];

  const [selectedMethod, setSelectedMethod] = useState(options[0].value);
  const [tolerance, setTolerance] = useState(0);

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  return (
    <div>
      <Link to="/"><button>{"<"}</button></Link>
      <h1>Ecuaciones lineales</h1>
      <label>Elegir método:</label>
      <select value={selectedMethod} onChange={handleMethodChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
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

      <MatrixInput />
    </div>
  );
}
