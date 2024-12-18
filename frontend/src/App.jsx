import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Link } from 'react-router-dom'; 
import useGetEncargos from './hooks/encargos/useEncargo'; 

function App() {
  const [count, setCount] = useState(0);


  const { encargos, loading, error } = useGetEncargos();


  useEffect(() => {

  }, []); 

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {}
      <div className="encargos">
        <h2>Encargos</h2>
        <Link to="/crear-encargo">
          <button>Crear Nuevo Encargo</button>
        </Link>
        {}
        <div className="encargos-list">
          {loading ? (
            <p>Cargando encargos...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : encargos.length > 0 ? (
            encargos.map((encargo) => (
              <div key={encargo.id} className="encargo-item">
                <p>
                  <strong>Encargo:</strong> {encargo.nombre}
                </p>
                <p>
                  <strong>Mecánico:</strong> {encargo.mecanico.nombre}
                </p>
                <p>
                  <strong>Horas:</strong> {encargo.horas}
                </p>
              </div>
            ))
          ) : (
            <p>No hay encargos disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
