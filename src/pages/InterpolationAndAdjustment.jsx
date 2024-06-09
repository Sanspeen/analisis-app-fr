import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function InterpolationAndAdjustment() {
    const options = [
        {
            label: "Lagrange",
            value: "lagrange",
        },
        {
            label: "Mínimos Cuadrados",
            value: "minimos-cuadrados",
        }
    ];

    const [selectedMethod, setSelectedMethod] = useState(options[0].value);
    const [listA, setListA] = useState('');
    const [listB, setListB] = useState('');
    const [listPredict, setListPredict] = useState('');

    const solveEquation = () => {
        let data = {
            list_a: listA.split(',').map(Number),
            list_b: listB.split(',').map(Number),
        };

        if (selectedMethod === 'lagrange') {
            data = {
                ...data,
                list_predict: listPredict.split(',').map(Number)
            };
        }

        console.log(data);

        axios({
            method: "POST",
            url: `http://localhost:5000/interpolacion-${selectedMethod}`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            data: data
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error('Error en la solicitud:', error);
        });
    };

    return (
        <div>
            <Link to="/"><button>{"<-"}</button></Link>
            <h1>Interpolación y ajuste</h1>
            <label>Elegir método:</label>
            <select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
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
            <div style={{ display: selectedMethod !== 'lagrange' ? 'none' : 'block' }}>
                <label htmlFor="listPredictInput">Lista de Predicción: </label>
                <input
                    id="listPredictInput"
                    type="text"
                    value={listPredict}
                    onChange={(e) => setListPredict(e.target.value)}
                />
            </div>

            <button onClick={solveEquation}>Run</button>
        </div>
    );
}
