"use strict";
import Joi from "joi";


export const encargoQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El ID debe ser un número.",
            "number.positive": "El ID debe ser un número positivo.",
            "number.integer": "El ID debe ser un número entero.",
        }),
});

export const encargoBodyValidation = Joi.object({
    nombreCliente: Joi.string()
        .min(1)
        .max(255)
        .required()
        .messages({
            "string.base": "El nombre del cliente debe ser una cadena de texto.",
            "string.empty": "El nombre del cliente no puede estar vacío.",
            "string.min": "El nombre del cliente debe tener al menos 1 carácter.",
            "string.max": "El nombre del cliente no puede tener más de 255 caracteres.",
            "any.required": "El nombre del cliente es obligatorio.",
        }),
    telCliente: Joi.string()  
        .max(12)
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            "string.base": "El teléfono debe ser una cadena de texto.",
            "string.empty": "El teléfono no puede estar vacío.",
            "string.length": "El teléfono debe tener exactamente 12 caracteres.",
            "string.pattern.base": "El teléfono solo puede contener números.",
            "any.required": "El teléfono es obligatorio.",
        }),
    tarea: Joi.string()
        .min(1)
        .max(500)
        .required()
        .messages({
            "string.base": "La tarea debe ser una cadena de texto.",
            "string.empty": "La tarea no puede estar vacía.",
            "string.min": "La tarea debe tener al menos 1 carácter.",
            "string.max": "La tarea no puede tener más de 500 caracteres.",
            "any.required": "La tarea es obligatoria.",
        }),
    detalle: Joi.string()
        .min(1)
        .max(1500)
        .required()
        .messages({
            "string.base": "El detalle debe ser una cadena de texto.",
            "string.empty": "El detalle no puede estar vacío.",
            "string.min": "El detalle debe tener al menos 1 carácter.",
            "string.max": "El detalle no puede tener más de 1500 caracteres.",
            "any.required": "El detalle es obligatorio.",
        }),
    mecanicoAsignado: Joi.string()
        .max(255)
        .pattern(/^[0-9a-fA-F]{24}$/) 
        .messages({
            "string.base": "El mecánico asignado debe ser una cadena de texto.",
            "string.max": "El mecánico asignado no puede tener más de 255 caracteres.",
            "string.pattern.base": "El mecánico asignado debe ser un ID válido.",
        }),
    horas: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Las horas deben ser un número.",
            "number.integer": "Las horas deben ser un número entero.",
            "number.min": "Las horas deben ser al menos 1.",
            "any.required": "Las horas son obligatorias.",
        }),
});
export const encargoPatchValidation = Joi.object({
    nombreCliente: Joi.string()
        .max(255)
        .messages({
            "string.base": "El nombre del cliente debe ser una cadena de texto.",
            "string.max": "El nombre del cliente no puede tener más de 255 caracteres.",
        }),
    telCliente: Joi.string()
        .max(12)
        .pattern(/^[0-9]+$/)
        .messages({
            "string.base": "El teléfono debe ser una cadena de texto.",
            "string.length": "El teléfono debe tener exactamente 12 caracteres.",
            "string.pattern.base": "El teléfono solo puede contener números.",
        }),
    tarea: Joi.string()
        .max(500)
        .messages({
            "string.base": "La tarea debe ser una cadena de texto.",
            "string.max": "La tarea no puede tener más de 500 caracteres.",
        }),
    detalle: Joi.string()
        .max(1500)
        .messages({
            "string.base": "El detalle debe ser una cadena de texto.",
            "string.max": "El detalle no puede tener más de 1500 caracteres.",
        }),
    mecanicoAsignado: Joi.string()
        .max(255)
        .messages({
            "string.base": "El mecánico asignado debe ser una cadena de texto.",
            "string.max": "El mecánico asignado no puede tener más de 255 caracteres.",
        }),
    horas: Joi.number()
        .integer()
        .min(1)
        .messages({
            "number.base": "Las horas deben ser un número.",
            "number.integer": "Las horas deben ser un número entero.",
            "number.min": "Las horas deben ser al menos 1.",
        }),
        estado: Joi.string()
        .valid("pendiente", "en progreso", "completado") 
        .messages({
            "string.base": "El estado debe ser una cadena de texto.",
            "string.valid": "El estado debe ser uno de los siguientes: pendiente, en progreso, finalizado.",
        }),
});
