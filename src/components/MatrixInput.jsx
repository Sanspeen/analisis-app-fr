import React, { useState } from 'react';
import axios from 'axios';

export default function MatrixInput({ selectedMethod }) {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [response, setResponse] = useState(null); // Nuevo estado para la respuesta

  const handleDimensionSubmit = (e) => {
    e.preventDefault();
    const initialMatrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));
    setMatrix(initialMatrix);
    const initialMatrixB = Array.from({ length: rows }, () => '');
    setMatrixB(initialMatrixB);
  };

  const handleInputChange = (e, rowIndex, colIndex, isMatrixA) => {
    const { value } = e.target;
    if (isMatrixA) {
      const newMatrix = matrix.map((row, i) =>
        i === rowIndex ? row.map((val, j) => (j === colIndex ? value : val)) : row
      );
      setMatrix(newMatrix);
    } else {
      const newMatrixB = matrixB.map((val, i) => (i === rowIndex ? value : val));
      setMatrixB(newMatrixB);
    }
  };

  const handleDataSubmit = () => {
    const numericMatrix = matrix.map(row => row.map(value => parseFloat(value)));
    const numericMatrixB = matrixB.map(value => parseFloat(value));

    const requestData = {
      matrix_A: numericMatrix,
      matrix_B: numericMatrixB
    };

    let url = '';
    let data = {};

    if (selectedMethod === 'eliminacion-g') {
      url = 'http://localhost:5000/ecuaciones-lineales-eliminacion-g';
      data = requestData;
    } else if (selectedMethod === 'gauss-seidel') {
      url = 'http://localhost:5000/ecuaciones-lineales-gauss-seidel';
      const tolerance = 1e-6;
      data = {
        ...requestData,
        tolerance: tolerance
      };
    } else if (selectedMethod === 'pivoteo') {
      url = 'http://localhost:5000/ecuaciones-lineales-pivoteo';
      data = requestData;
    }

    console.log(data);

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
        setResponse(response.data); // Guardar la respuesta en el estado
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleDimensionSubmit}>
        <div>
          <label htmlFor="rowsInput">Filas: </label>
          <input
            id="rowsInput"
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="colsInput">Columnas: </label>
          <input
            id="colsInput"
            type="number"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
          />
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
                        onChange={(e) => handleInputChange(e, rowIndex, colIndex, true)}
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
              {matrixB.map((value, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(e, rowIndex, 0, false)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {matrix.length > 0 && <button onClick={handleDataSubmit}>Submit Data</button>}

      {(selectedMethod === 'pivoteo' || selectedMethod === 'eliminacion-g') && response?.result && (
        <div>
          <label>Respuesta: {response.result.map((res, index) => (
            <span key={index}>{res.toFixed(2)}{index < response.result.length - 1 ? ', ' : ''}</span>
          ))}</label>
        </div>
      )}

      {selectedMethod === 'gauss-seidel' && response && (
        <div>
          <h3>Errores</h3>
          <table>
            <tbody>
              {response.errores.map((error, index) => (
                <tr key={index}>
                  <td>{error.toFixed(8)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Radio Espectral TG</h3>
          <table>
            <tbody>
              <tr>
                <td>{response.radio_espectral_tg}</td>
              </tr>
            </tbody>
          </table>

          <h3>Resultado</h3>
          <table>
            <tbody>
              {response.result.map((res, index) => (
                <tr key={index}>
                  <td>{res.toFixed(8)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
