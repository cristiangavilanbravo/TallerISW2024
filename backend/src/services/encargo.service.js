"use strict";
import UserSchema from "../entity/user.entity.js";
import Encargo from "../entity/encargo.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createEncargoService(dataEncargo) {
    try {
        console.log("Datos recibidos en el encargo:", dataEncargo);

        const encargoRepository = AppDataSource.getRepository(Encargo);
        const userRepository = AppDataSource.getRepository(UserSchema);

        let mecanico;

        // Buscar mecánico por ID
        if (!isNaN(dataEncargo.mecanicoAsignado)) {
            const mecanicoId = Number(dataEncargo.mecanicoAsignado);
            console.log("Buscando mecánico por ID:", mecanicoId);

            mecanico = await userRepository.findOne({
                where: { id: mecanicoId, disponibilidad: true, rol: "mecanico" },
            });
        }
        // Buscar mecánico por nombre completo
        else if (typeof dataEncargo.mecanicoAsignado === "string") {
            console.log("Buscando mecánico por nombre completo:", dataEncargo.mecanicoAsignado);

            mecanico = await userRepository
                .createQueryBuilder("user")
                .where("LOWER(user.nombreCompleto) = LOWER(:nombreCompleto)", { 
                    nombreCompleto: dataEncargo.mecanicoAsignado 
                })
                .andWhere("user.disponibilidad = :disponibilidad", { disponibilidad: true })
                .andWhere("user.rol = :rol", { rol: "mecanico" })
                .getOne();
        }

        console.log("Resultado del repositorio:", mecanico);

        // Validar si el mecánico existe y está disponible
        if (!mecanico) {
            return [null, "El mecánico no está disponible, no existe o no tiene el rol adecuado"];
        }

        // Crear un nuevo encargo
        const newEncargo = encargoRepository.create({
            nombreCliente: dataEncargo.nombreCliente,
            telCliente: dataEncargo.telCliente,
            tarea: dataEncargo.tarea,
            detalle: dataEncargo.detalle,
            mecanicoAsignado: mecanico.id,
            horas: dataEncargo.horas,
            estado: "pendiente",
        });

        const encargoSaved = await encargoRepository.save(newEncargo);

        // Actualizar la disponibilidad del mecánico
        mecanico.disponibilidad = false;
        await userRepository.save(mecanico);

        return [encargoSaved, "Se ha creado un nuevo encargo"];
    } catch (error) {
        console.error("Error al crear el encargo:", error.message || error);
        return [null, `Error interno del servidor: ${error.message || "desconocido"}`];
    }
}

export async function getEncargoService({ id }) {
    try {
        const encargoRepository = AppDataSource.getRepository(Encargo);
        const encargoFound = await encargoRepository.findOne({
            where: { id: id },
        });

        if (!encargoFound) return [null, "Encargo no encontrado"];

        return [encargoFound, null];
    } catch (error) {
        console.error("Error al obtener el encargo:", error);
        return [null, "Error interno del servidor"];
    }
}


export async function getEncargosService() {
    try {
      const encargoRepository = AppDataSource.getRepository(Encargo);
  

      const encargos = await encargoRepository.find({
        order: {
          id: "ASC", 
         
        },
      });
  
      if (!encargos.length) {
        return [null, "No hay encargos disponibles"];
      }
  
      return [encargos, null];
    } catch (error) {
      console.error("Error al obtener los encargos:", error);
      return [null, "Error interno del servidor"];
    }
  }
  
  export async function updateEncargoService(id, data) {
    try {

        if (!id || isNaN(id)) {
            return [null, "ID inválido"];
        }

        const encargoRepository = AppDataSource.getRepository(Encargo);
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);


        const encargo = await encargoRepository.findOneBy({ id });
        if (!encargo) return [null, "Encargo no encontrado"];


        if (!data.estado && !data.detalle && !data.horas) {
            return [null, "No hay datos válidos para actualizar"];
        }


        if (data.estado) {
            const estadosValidos = ["pendiente", "en progreso", "completado"];
            if (!estadosValidos.includes(data.estado)) {
                return [null, `Estado inválido. Estados permitidos: ${estadosValidos.join(", ")}`];
            }
            encargo.estado = data.estado;


            if (data.estado === "completado") {
                const mecanico = await mecanicoRepository.findOneBy({ id: encargo.mecanicoAsignado });
                if (mecanico) {
                    mecanico.disponibilidad = true; 
                    await mecanicoRepository.save(mecanico);
                }
            }
        }


        if (data.detalle) {
            encargo.detalle = data.detalle;
        }


        if (data.horas) {
            if (data.horas <= 0) return [null, "El valor de las horas debe ser mayor a 0"];
            encargo.horas = data.horas;
        }


        await encargoRepository.save(encargo);

        return [encargo, null];
    } catch (error) {
        console.error("Error al actualizar el encargo:", error);
        return [null, "Error al actualizar el encargo"];
    }
}


export async function deleteEncargoService(query) {
    try {
        const { id } = query; // Destructuramos el id de la consulta
        const encargoRepository = AppDataSource.getRepository(Encargo);
        const userRepository = AppDataSource.getRepository(UserSchema); // Usamos UserSchema si es el modelo adecuado

        // Buscar el encargo por ID
        const encargoFound = await encargoRepository.findOne({
            where: { id: id },
        });

        if (!encargoFound) return [null, "Encargo no encontrado"];

        // Eliminar el encargo
        const encargoDeleted = await encargoRepository.remove(encargoFound);

        // Buscar el mecánico asignado al encargo
        const mecanico = await userRepository.findOne({
            where: { id: encargoFound.mecanicoAsignado },
        });

        if (mecanico) {
            // Si el mecánico existe, actualizar su disponibilidad
            mecanico.disponibilidad = true;
            await userRepository.save(mecanico);
        }

        return [encargoDeleted, null]; // Retornamos el encargo eliminado
    } catch (error) {
        console.error("Error al eliminar el encargo:", error);
        return [null, "Error interno del servidor"];
    }
}