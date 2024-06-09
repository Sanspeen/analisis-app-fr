import React, { useState } from 'react';

export default function MatrixInput() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [matrix, setMatrix] = useState([]);

  const handleDimensionSubmit = (e) => {
    e.preventDefault();
    const initialMatrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ''));
    setMatrix(initialMatrix);
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = e.target.value;
    setMatrix(newMatrix);
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
            onChange={(e) => setRows(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="colsInput">Columnas: </label>
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
          <h3>Matrix Inputs</h3>
          <table>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
