import React from 'react'
import { Link } from 'react-router-dom';

export default function DifferentialEquations() {
  return (
    <div>
      <Link to="/"><button>{"<-"}</button></Link>
      <h1>Ecuaciones diferenciales</h1>
      <Link><button>Tema X</button></Link>
    </div>
  )
}
