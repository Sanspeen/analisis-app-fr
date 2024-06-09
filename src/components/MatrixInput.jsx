import React, { useState } from 'react';
import axios from 'axios';

export default function MatrixInput({ selectedMethod }) {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [matrixB, setMatrixB] = useState([]);

  const handleDimensionSubmit = (e) => {
    e.preventDefault();
    const initialMatrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));
    setMatrix(initialMatrix);

    // Inicializar la matriz B como un array de números
    const initialMatrixB = Array.from({ length: rows }, () => '');
    setMatrixB(initialMatrixB);
  };

  const handleInputChange = (e, rowIndex, colIndex, matrixToUpdate) => {
    const newMatrix = [...matrixToUpdate];
    newMatrix[rowIndex] = e.target.value;
    if (matrixToUpdate === matrix) {
      setMatrix(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  const handleDataSubmit = () => {
    console.log('Matriz A:', matrix);
    console.log('Matriz B:', matrixB);

    // Convertir los valores de las matrices a números
    const numericMatrix = matrix.map(row => row.map(value => parseFloat(value)));
    const numericMatrixB = matrixB.map(value => parseFloat(value));

    // Preparar los datos para la solicitud HTTP
    const requestData = {
      matrix_A: numericMatrix,
      matrix_B: numericMatrixB
    };

    // Determinar la URL y los datos específicos según el método seleccionado
    let url = '';
    let data = {};

    if (selectedMethod === 'eliminacion-g') {
      url = 'http://localhost:5000/ecuaciones-lineales-eliminacion-g';
      data = requestData;
    } else if (selectedMethod === 'gauss-seidel') {
      url = 'http://localhost:5000/ecuaciones-lineales-gauss-seidel';
      const tolerance = 1e-6; // Tolerancia fija para el método Gauss-Seidel
      data = {
        ...requestData,
        tolerance: tolerance
      };
    }

    console.log(data);

    // Realizar la solicitud HTTP
    axios({
      method: 'POST',
      url: url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleDimensionSubmit}>
        <div>
          <label htmlFor="rowsInput">Rows: </label>
          <input id="rowsInput" type="number" value={rows} onChange={(e) => setRows(e.target.value)} />
        </div>
        <div>
          <label htmlFor="colsInput">Cols: </label>
          <input id="colsInput" type="number" value={cols} onChange={(e) => setCols(e.target.value)} />
        </div>
        <button type="submit">Generate Matrix</button>
      </form>

      {matrix.length > 0 && (
        <div>
          <h3>Matrix A Inputs</h3>
          <table>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(e, rowIndex, colIndex, matrix)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {matrixB.length > 0 && (
        <div>
          <h3>Matrix B Inputs</h3>
          <table>
            <tbody>
              <tr>
                {matrixB.map((value, rowIndex) => (
                  <td key={rowIndex}>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(e, rowIndex, 0, matrixB)}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {matrix.length > 0 && <button onClick={handleDataSubmit}>Submit Data</button>}
    </div>
  );
}
