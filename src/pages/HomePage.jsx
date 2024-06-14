import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-container">
        <h1>Calculadora Análisis Numérico</h1>
        <div className="button-container">
          <Link to="/series-y-errores"><button>Series de Taylor y Errores</button></Link>
          <Link to="/ceros"><button>Ceros</button></Link>
          <Link to="/ecuaciones-lineales"><button>Ecuaciones Lineales</button></Link>
          <Link to="/interpolacion-y-ajuste"><button>Interpolación y Ajuste</button></Link>
          <Link to="/ecuaciones-diferenciales"><button>Ecuaciones Diferenciales</button></Link>
        </div>
    </div>
  )
}

