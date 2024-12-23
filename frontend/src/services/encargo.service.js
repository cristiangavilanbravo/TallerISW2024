import axios from "./root.service";

export async function createEncargo(data) {
  const response = await axios.post('/encargo/', data);
  return response.data;
}
export async function getEncargos() {
  try {
    console.log('Haciendo solicitud a /encargo');
    const response = await axios.get('/encargo');
    console.log('Respuesta del backend:', response.data); // Imprime la respuesta completa para verificar

    // Ajusta aquí según la estructura correcta de la respuesta
    return response.data.data || [];
  } catch (error) {
    console.error('Error al obtener los encargos:', error);
    return []; // Devuelve un arreglo vacío si hay error
  }
}
// Función para actualizar un encargo
export async function updateEncargo(id, data) {
  const response = await axios.patch(`/encargo/${id}`, data);
  return response.data;
}

// Función para eliminar un encargo
export async function deleteEncargo(id) {
  const response = await axios.delete(`/encargo/${id}`); 
  return response.data;
}