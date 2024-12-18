import { useState, useEffect } from 'react';

const useEncargo = () => {
    const [encargos, setEncargos] = useState([]);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (filter) {
            setError('');  
        }
    }, [filter]);

    const fetchEncargos = async () => {
        try {
            const response = await fetch('/api/encargo');
            const data = await response.json();
            setEncargos(data.details);
        } catch {
            setError('Error al cargar los encargos');
        }
    };

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    return {
        encargos,
        error,
        filter,
        fetchEncargos,
        handleFilterChange,
    };
};

export default useEncargo;
