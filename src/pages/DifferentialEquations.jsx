import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DifferentialEquations() {
  const options = [
    {
      label: "Kutta",
      value: "kutta",
    },
    {
      label: "Euler",
      value: "euler",
    }
  ];

  const [selectedMethod, setSelectedMethod] = useState(options[0].value);
  const [functionValue, setFunctionValue] = useState('');
  const [limInferior, setLimInferior] = useState('');
  const [limSuperior, setLimSuperior] = useState('');
  const [initConditions, setInitConditions] = useState('');
  const [integrationStep, setIntegrationStep] = useState('');

  const solveEquation = () => {
    const initConditionsArray = initConditions.split(',').map(Number);

    const data = {
      function: functionValue,
      lim_inferior: parseFloat(limInferior),
      lim_superior: parseFloat(limSuperior),
      init_conditions: initConditionsArray,
      integration_step: parseFloat(integrationStep)
    }

    console.log(selectedMethod);
    console.log(data);

    axios({
      method: "POST",
      url: `http://localhost:5000/diff-eq-${selectedMethod}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      data: {
        function: functionValue,
        lim_inferior: parseFloat(limInferior),
        lim_superior: parseFloat(limSuperior),
        init_conditions: initConditionsArray,
        integration_step: parseFloat(integrationStep)
      }
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error('Error en la solicitud:', error);
    });
  };

  return (
    <div>
      <Link to="/"><button>{"<-"}</button></Link>
      <h1>Ecuaciones diferenciales</h1>
      <label>Elegir metodo:</label>
      <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
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
    </div>
  );
}