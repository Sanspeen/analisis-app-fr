import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LineChart from './components/LineChart';
import PolynomialChart from './components/PolynomialChart';
import HomePage from './pages/HomePage';
import ReactDOM from "react-dom/client";
import CerosPage from './pages/CerosPage';
import SeriesAndErrors from './pages/SeriesAndErrors';
import LinealEquations from './pages/LinealEquations';
import InterpolationAndAdjustment from './pages/InterpolationAndAdjustment';
import DifferentialEquations from './pages/DifferentialEquations';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/series-y-errores" element={<SeriesAndErrors />} />
          <Route path="/ceros" element={<CerosPage />} />
          <Route path="/ecuaciones-lineales" element={<LinealEquations />} />
          <Route path="/interpolacion-y-ajuste" element={<InterpolationAndAdjustment />} />
          <Route path="/ecuaciones-diferenciales" element={<DifferentialEquations />} />
        </Routes>
        {/* <h1>React Chart.js Line Chart Example</h1>
        <LineChart />
        <h1>Polynomial Chart Example</h1>
        <PolynomialChart></PolynomialChart> */}
      </div>
    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App
