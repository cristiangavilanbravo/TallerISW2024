import { useState } from "react";
import { createEncargo } from "@services/encargo.service";

export function useCreateEncargo() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitEncargo = async (data) => {
    try {
      setError(null);
      setSuccess(false); // Reinicia el estado antes de hacer la solicitud
      await createEncargo(data); // Llama al servicio para crear el encargo
      setSuccess(true); // Indica éxito si no hay errores
    } catch (err) {
      setError("Error al crear el encargo. Por favor, intenta nuevamente.");
      console.error(err);
    }
  };

  return { error, success, submitEncargo };
}
