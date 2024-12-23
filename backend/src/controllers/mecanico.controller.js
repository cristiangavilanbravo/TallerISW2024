import { getRepository } from "typeorm";
import { getMecanicos } from "../services/mecanico.service.js"; // Importa el servicio

export const getMecanicosController = async (req, res) => {
  try {
    const mecanicos = await getMecanicos();  // Llama al servicio para obtener los mecánicos
    res.json(mecanicos);  // Responde con los datos obtenidos
  } catch (err) {
    console.error("Error al obtener los mecánicos:", err);
    res.status(500).json({ message: `Error al obtener los mecánicos: ${err.message}` });
  }
};
