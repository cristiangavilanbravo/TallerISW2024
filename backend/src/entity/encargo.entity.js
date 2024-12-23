"use strict";
import { EntitySchema } from "typeorm";
import Mecanico from "../entity/user.entity.js";

const EncargoSchema = new EntitySchema({
    name: "Encargo",
    tableName: "encargos",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nombreCliente: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        telCliente: {
            type: "varchar",
            length: 12,
            nullable: false,
        },
        tarea: {
            type: "varchar",
            length: 500,
            nullable: false,
        },
        detalle: {
            type: "varchar",
            length: 1500,
            nullable: false,
        },
        mecanicoAsignado: {
            type: "int", 
            nullable: true,
            manyToOne: {
                target: Mecanico, 
                joinColumn: { name: "mecanicoAsignado", referencedColumnName: "id" },
            },
        },
        horas: {
            type: "int",
            nullable: false,
        },
        estado: {
            type: "enum",
            enum: ["pendiente", "en progreso", "completado", "cancelado"],
            nullable: false,
            default: "pendiente", 
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_ENCARGO_ID",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_ENCARGO_NOMBRECLIENTE",
            columns: ["nombreCliente"],
        },
        {
            name: "IDX_ENCARGO_TELCLIENTE",
            columns: ["telCliente"],
        },
        {
            name: "IDX_ENCARGO_TAREA",
            columns: ["tarea"],
        },
        {
            name: "IDX_ENCARGO_DETALLE",
            columns: ["detalle"],
        },
        {
            name: "IDX_ENCARGO_MECANICOASIGNADO",
            columns: ["mecanicoAsignado"],
        },
        {
            name: "IDX_ENCARGO_HORAS",
            columns: ["horas"],
        },
        {
            name: "IDX_ENCARGO_ESTADO",
            columns: ["estado"], 
        },
    ],
});

export default EncargoSchema;