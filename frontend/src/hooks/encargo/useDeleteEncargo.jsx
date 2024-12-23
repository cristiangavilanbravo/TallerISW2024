import { useState } from 'react';
import { deleteEncargo } from '@services/encargo.service'; 

const useDeleteEncargo = (setEncargos) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (ids) => {
    setLoading(true);
    try {
      
      for (const id of ids) {
        await deleteEncargo(id); 
        setEncargos((prev) => prev.filter((encargo) => encargo.id !== id)); 
      }
    } catch (err) {
      setError('Hubo un error al eliminar el encargo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
};

export default useDeleteEncargo;
