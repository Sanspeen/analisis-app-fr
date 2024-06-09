import React, { useState } from 'react';

export default function MatrixInput() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [matrixB, setMatrixB] = useState([]);

  const handleDimensionSubmit = (e) => {
    e.preventDefault();
    const initialMatrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));
    setMatrix(initialMatrix);

    // Inicializar la matriz B con el número de columnas de la matriz A
    const initialMatrixB = Array.from({ length: 1 }, () => Array.from({ length: rows }, () => ''));
    setMatrixB(initialMatrixB);
  };

  const handleInputChange = (e, rowIndex, colIndex, matrixToUpdate) => {
    const newMatrix = [...matrixToUpdate];
    newMatrix[rowIndex][colIndex] = e.target.value;
    if (matrixToUpdate === matrix) {
      setMatrix(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  const handleDataSubmit = () => {
    console.log('Matriz A:', matrix);
    console.log('Matriz B:', matrixB);
  };

  return (
    <div>
      <form onSubmit={handleDimensionSubmit}>
        <div>
          <label htmlFor="rowsInput">Rows: </label>
          <input
            id="rowsInput"
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="colsInput">Cols: </label>
          <input
            id="colsInput"
            type="number"
            value={cols}
            onChange={(e) => setCols(e.target.value)}
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
              {matrixB.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(e, rowIndex, colIndex, matrixB)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {matrix.length > 0 && (
        <button onClick={handleDataSubmit}>Submit Data</button>
      )}
    </div>
  );
}
