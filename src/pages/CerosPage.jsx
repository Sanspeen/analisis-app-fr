import axios from 'axios';
import React, { useState } from 'react'; // Importa useState
import { Link } from 'react-router-dom';

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

    // Estado para almacenar el valor seleccionado
    const [selectedMethod, setSelectedMethod] = useState(options[0].value);

    const solveEquation = (methodToSolve) => {
        axios({
            method: "POST",
            url: `http://localhost:5000/ceros-${methodToSolve}`, // Utiliza el método seleccionado como parte de la URL
            data: {
                function: "2*x**2 / 30 - 1",
                lim_inferior: 1,
                lim_superior: 10,
                tolerancia: 1e-6
            }
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div>
            <Link to="/"><button>{"<-"}</button></Link>
            <h1>Ceros</h1>
            {/* Usa el estado selectedMethod para controlar el valor seleccionado del select */}
            <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {/* Pasa el método seleccionado a solveEquation */}
            <button onClick={() => solveEquation(selectedMethod)}>Run</button>
        </div>
    );
}
