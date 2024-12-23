import axios from './root.service'; // Asegúrate de que la ruta sea correcta

const getMecanicos = async () => {
  try {
    const response = await axios.get("/mecanicos");
    // Filtrar cualquier valor no deseado
    const mecanicos = response.data[0] || [];  // Accedemos solo al primer elemento del arreglo
    console.log("Datos de mecánicos:", mecanicos);
    return mecanicos;
  } catch (error) {
    console.error("Error al cargar los mecánicos:", error);
    return [];  // Devuelve un array vacío en caso de error
  }
};

export { getMecanicos };
