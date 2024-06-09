import React from 'react'
import { Link } from 'react-router-dom';
import MatrixInput from '../components/MatrixInput';



export default function LinealEquations() {
  const options = [
    {
      label: "Eliminacion gausiana",
      value: "eliminacion-g",
    },
    {
      label: "Gauss Seidel",
      value: "gauss-seidel",
    }
  ];
  return (
    <div>
      <Link to="/"><button>{"<-"}</button></Link>
      <h1>Ecuaciones lineales</h1>
      <MatrixInput></MatrixInput>

    </div>
  )
}
