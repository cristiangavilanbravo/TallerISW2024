"use strict";
import Mecanico from "../entity/user.entity.js";
import Encargo from "../entity/encargo.entity.js";
import { AppDataSource } from "../config/configDb.js";


export async function createEncargoService(dataEncargo) {
    try {
        const encargoRepository = AppDataSource.getRepository(Encargo);
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);
        const mecanico = await mecanicoRepository.findOne({
            where: { nombreCompleto: dataEncargo.mecanicoAsignado, disponibilidad: true },  
        });

        if (!mecanico) {
            return [null, "El mecánico no está disponible o no existe"];
        }


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


        mecanico.disponibilidad = false;
        await mecanicoRepository.save(mecanico);

        return [encargoSaved, "Se ha creado un nuevo encargo"];
    } catch (error) {
        console.error("Error al crear el encargo:", error);
        return [null, "Error interno del servidor"];
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
        const { id } = query;
        const encargoRepository = AppDataSource.getRepository(Encargo);
        const mecanicoRepository = AppDataSource.getRepository(Mecanico);

        const encargoFound = await encargoRepository.findOne({
            where: { id: id },
        });

        if (!encargoFound) return [null, "Encargo no encontrado"];

        const encargoDeleted = await encargoRepository.remove(encargoFound);


        const mecanico = await mecanicoRepository.findOne({
            where: { nombreCompleto: encargoFound.mecanicoAsignado },
        });

        if (mecanico) {
            mecanico.disponibilidad = true;
            await mecanicoRepository.save(mecanico);
        }

        return [encargoDeleted, null];
    } catch (error) {
        console.error("Error al eliminar el encargo:", error);
        return [null, "Error interno del servidor"];
    }
}
