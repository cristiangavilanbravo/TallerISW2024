"use strict";
import { AppDataSource } from "../config/configDb.js";
import User from "../entity/user.entity.js"; // Cambié a User en lugar de Mecanico

export async function getMecanicos() {
  try {
    const userRepository = AppDataSource.getRepository(User); // Usamos la entidad User

    // Realizamos la consulta para obtener los usuarios con rol "mecanico" y disponibilidad activa
    const mecanicos = await userRepository.find({
      where: {
        rol: "mecanico", // Filtramos por rol 'mecanico'
        disponibilidad: true, // Consideramos la disponibilidad de los mecánicos
      },
    });

    if (!mecanicos || mecanicos.length === 0) {
      return [null, "No se encontraron mecánicos disponibles"];
    }

    // Retorna los mecánicos sin la contraseña o detalles sensibles
    const mecanicosData = mecanicos.map((mecanico) => ({
      id: mecanico.id,
      nombre: mecanico.nombreCompleto,
      rut: mecanico.rut,  // Agregué más campos que podrían ser útiles
      email: mecanico.email,  // Agregué el email
    }));

    return [mecanicosData, null];
  } catch (error) {
    console.error("Error al obtener los mecánicos:", error);
    return [null, "Error interno del servidor"];
  }
}
