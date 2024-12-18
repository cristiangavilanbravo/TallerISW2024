import { useState } from 'react';

export const useEditEncargo = () => {
    const [error, setError] = useState('');

    const editEncargo = async (id, data) => {
        try {
            const response = await fetch(`/api/encargos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al editar el encargo');
            }
            return response.json();
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        error,
        editEncargo,
    };
};
