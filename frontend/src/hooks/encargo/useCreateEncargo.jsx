import { useState } from 'react';

export const useCreateEncargo = () => {
    const [error, setError] = useState('');

    const createEncargo = async (data) => {
        try {
            const response = await fetch('/api/encargos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error al crear el encargo');
            }
            return response.json();
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        error,
        createEncargo,
    };
};
