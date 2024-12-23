// src/hooks/encargo/useEditEncargo.jsx
import { useState } from 'react';
import { updateEncargo } from '@services/encargo.service'; // Asegúrate de importar correctamente

const useEditEncargo = (setEncargos) => {
  const [setLoading] = useState(false);
  const [setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEncargo, setSelectedEncargo] = useState(null);

  const handleClickUpdate = (encargo) => {
    setSelectedEncargo(encargo); // Guarda el encargo seleccionado
    setIsPopupOpen(true); // Abre el popup para editar
  };

  const handleUpdate = async (updatedEncargo) => {
    setLoading(true);
    try {
      const result = await updateEncargo(updatedEncargo.id, updatedEncargo);
      setEncargos((prev) =>
        prev.map((encargo) =>
          encargo.id === updatedEncargo.id ? { ...encargo, ...result } : encargo
        )
      );
      setIsPopupOpen(false); // Cierra el popup
    } catch (err) {
      setError('Hubo un error al actualizar el encargo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    selectedEncargo,
  };
};

export default useEditEncargo;
