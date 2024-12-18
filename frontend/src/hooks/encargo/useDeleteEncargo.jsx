import { useState } from 'react';

export const useDeleteEncargo = () => {
    const [error, setError] = useState('');

    const deleteEncargo = async (id) => {
        try {
            const response = await fetch(`/api/encargos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el encargo');
            }
            return response.json();
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        error,
        deleteEncargo,
    };
};
