import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../components/LineChart';

export default function CerosPage() {
    const options = [
        {
            label: "Biseccion",
            value: "biseccion",
        },
        {
            label: "Falsa posicion",
            value: "falsa-posicion",
        },
        {
            label: "Newton",
            value: "newton",
        },
        {
            label: "Secante",
            value: "secante",
        },
    ];

    const [selectedMethod, setSelectedMethod] = useState(options[0].value);
    const [functionValue, setFunctionValue] = useState('');
    const [aValue, setAValue] = useState('');
    const [bValue, setBValue] = useState('');
    const [toleranceValue, setToleranceValue] = useState('');
    const [raiz, setRaiz] = useState(0);
    const [iterationResults, setIterationResults] = useState([]);
    const [numberOfIterations, setNumberOfIterations] = useState(0);


    const solveEquation = () => {
        axios({
            method: "POST",
            url: `http://localhost:5000/ceros-${selectedMethod}`,
            headers: {
                "Access-Control-Allow-Origin": "*", // O el origen específico de tu aplicación de React
                "Content-Type": "application/json"
            },
            data: {
                function: functionValue,
                lim_inferior: parseFloat(aValue),
                lim_superior: parseFloat(bValue),
                tolerancia: parseFloat(toleranceValue)
            }
        }).then((response) => {
            setIterationResults(response.data.valores_iteracion);
            setNumberOfIterations(response.data.iteraciones);
            setRaiz(response.data.raiz);
            console.log(response);
        }).catch((error) => {
            console.error('Error en la solicitud:', error);
        });
    };

    // Crear una tabla de iteraciones y valores
    const iterationTable = Array.from({ length: numberOfIterations }, (_, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{iterationResults[index]}</td>
        </tr>
    ));

    return (
        <div>
            <Link to="/"><button>{"<-"}</button></Link>
            <h1>Ceros</h1>
            <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <div>
                <label htmlFor="functionInput">Función:</label>
                <input 
                    id="functionInput" 
                    type="text" 
                    value={functionValue} 
                    onChange={(e) => setFunctionValue(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="aInput">a:</label>
                <input 
                    id="aInput" 
                    type="number" 
                    value={aValue} 
                    onChange={(e) => setAValue(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="bInput">b:</label>
                <input 
                    id="bInput" 
                    type="number" 
                    value={bValue} 
                    onChange={(e) => setBValue(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="toleranceInput">Tolerancia:</label>
                <input 
                    id="toleranceInput" 
                    type="number" 
                    step="any" 
                    value={toleranceValue} 
                    onChange={(e) => setToleranceValue(e.target.value)} 
                />
            </div>
            <h3>Raiz</h3>
            <label htmlFor="toleranceInput">Resultado: {raiz}</label>

            <LineChart iteraciones={numberOfIterations} valores_iteracion={iterationResults}></LineChart>
            <button onClick={solveEquation}>Run</button>
            {/* Agregar la tabla de iteraciones y valores */}
            <table>
                <thead>
                    <tr>
                        <th>Iteración</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {iterationTable}
                </tbody>
            </table>
        </div>
    );
}
