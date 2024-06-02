import React from 'react'
import { Link } from 'react-router-dom';


export default function HomePage() {
  return (
    <div>
        <h1>Calculadora Analisis</h1>
        <Link to="/series-y-errores"><button>Series de Taylor y Errores</button></Link>
        <Link to="/ceros"><button>Ceros</button></Link>
        <Link to="/ecuaciones-lineales"><button>Ecuaciones lineales</button></Link>
        <Link to="/interpolacion-y-ajuste"><button>Interpolacion y ajuste</button></Link>
        <Link to="/ecuaciones-diferenciales"><button>Ecuaciones diferenciales</button></Link>
    </div>
  )
}
