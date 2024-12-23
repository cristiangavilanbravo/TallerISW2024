import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';

export async function getUsers() {
    try {
        const { data } = await axios.get('/user/');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}
export async function getUserById(userId) {
    try {
        const { data } = await axios.get(`/user/detail?id=${userId}`);
        console.log('Datos completos del usuario:', data);

        return {
            id: data.data.id, // Asegúrate de acceder al objeto `data`
            nombre: data.data.nombreCompleto || "Sin Nombre", // Usa `data.data` para acceder al nombre
        };
    } catch (error) {
        console.error(`Error al obtener el mecánico con ID ${userId}:`, error.message);
        return {
            id: userId,
            nombre: "Desconocido",
        };
    }
}
export async function updateUser(data, rut) {
    try {
        const response = await axios.patch(`/user/detail/?rut=${rut}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteUser(rut) {
    try {
        const response = await axios.delete(`/user/detail/?rut=${rut}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}