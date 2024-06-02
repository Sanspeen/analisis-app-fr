import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LineChart from './components/LineChart';
import PolynomialChart from './components/PolynomialChart';
import HomePage from './pages/HomePage';
import ReactDOM from "react-dom/client";
import CerosPage from './pages/CerosPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ceros" element={<CerosPage />} />
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
