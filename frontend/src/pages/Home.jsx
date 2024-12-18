import { Link,useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Bienvenido a la página de inicio</h1>
      <Link to="/encargos">
        <button>Ver Listado de Encargos</button>
        <button onClick={() => navigate("/encargo/crear")}>Crear Encargo</button>
      </Link>
      
    </>
  );
};

export default Home;
