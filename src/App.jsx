import './App.css'
import LineChart from './components/LineChart';
import PolynomialChart from './components/PolynomialChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Chart.js Line Chart Example</h1>
        <LineChart />
        <h1>Polynomial Chart Example</h1>
        <PolynomialChart></PolynomialChart>
      </header>
    </div>
  );
}


export default App
