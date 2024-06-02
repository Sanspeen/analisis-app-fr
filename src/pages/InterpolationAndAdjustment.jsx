import React from 'react'
import { Link } from 'react-router-dom';

export default function InterpolationAndAdjustment() {
  return (
    <div>
      <Link to="/"><button>{"<-"}</button></Link>
      <h1>Interpolacion y ajuste</h1>
      <Link><button>Tema X</button></Link>
    </div>
  )
}
