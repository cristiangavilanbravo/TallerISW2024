import Form from "@components/Form";
import "@styles/createEncargoPage.css";
import { useCreateEncargo } from "@hooks/encargo/useCreateEncargo";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMecanicos } from "@services/mecanico.service"; // Asegúrate de que la ruta sea correcta

const CreateEncargoPage = () => {
  const navigate = useNavigate();
  const { error, success, submitEncargo } = useCreateEncargo();
  const [mecanicos, setMecanicos] = useState([]);
  const [errorMecanicos, setErrorMecanicos] = useState(null); // Error de mecánicos

  useEffect(() => {
    const fetchMecanicos = async () => {
      try {
        const fetchedMecanicos = await getMecanicos();
        console.log("Datos de mecánicos:", fetchedMecanicos);
        // Asegúrate de que fetchedMecanicos sea un arreglo
        if (Array.isArray(fetchedMecanicos)) {
          setMecanicos(fetchedMecanicos);
          setErrorMecanicos(null); // Limpiar el error si se obtienen mecánicos
        } else {
          throw new Error("Respuesta inválida de mecánicos");
        }
      } catch (err) {
        setErrorMecanicos(err.message || "Error al cargar mecánicos");
        setMecanicos([]); // Limpiar los mecánicos si hay un error
      }
    };

    fetchMecanicos();
  }, []);

  const handleSubmit = async (data) => {
    // Validar horas para que sean al menos 1
    if (data.horas < 1) {
      data.horas = 1; // Si es menor que 1, se ajusta a 1
    }
    await submitEncargo(data);
  };

  const formFields = [
    {
      name: "nombreCliente",
      type: "text",
      fieldType: "input",
      label: "Nombre del Cliente",
      placeholder: "Escribe el nombre del cliente",
      required: true,
      minLength: 5,
      maxLength: 50,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      patternMessage: "Debe contener solo letras y espacios",
    },
    {
      name: "telCliente",
      type: "tel",
      fieldType: "input",
      label: "Teléfono del Cliente",
      placeholder: "Ingresa el teléfono del cliente",
      required: true,
      minLength: 7,
      maxLength: 15,
      pattern: /^[0-9]{7,15}$/, // Aceptar de 7 a 15 caracteres numéricos
      patternMessage: "Debe ser un número de teléfono válido (7 a 15 dígitos)",
    },
    {
      name: "tarea",
      type: "text",
      fieldType: "textarea",
      label: "Tarea",
      placeholder: "Describe la tarea a realizar",
      required: true,
      minLength: 10,
      maxLength: 200,
    },
    {
      name: "detalle",
      type: "textarea",
      fieldType: "textarea",
      label: "Detalle del Encargo",
      placeholder: "Describe el encargo",
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    {
      name: "horas",
      type: "number",
      fieldType: "input",
      min: "1", // Mínimo 1 hora
      label: "Horas",
      placeholder: "Ingresa la cantidad de horas",
      required: true,
      onChange: (e) => {
        // Evitar valores negativos o cero
        if (e.target.value < 1) {
          e.target.value = 1; // Se ajusta a 1 si el valor es menor que 1
        }
      },
      validate: {
        minValue: (value) => value >= 1 || "Las horas deben ser al menos 1",
      },
    },
    {
      name: "mecanicoAsignado",
      type: "select",
      fieldType: "select",
      label: "Mecánico Asignado",
      options: mecanicos.map((mecanico) => ({
        value: mecanico.id,
        label: mecanico.nombre,
      })),
      placeholder: errorMecanicos ? errorMecanicos : "Selecciona un mecánico",
      required: true,
      disabled: mecanicos.length === 0,
    },
  ];

  if (success) {
    navigate("/encargos/listar");
  }

  return (
    <div className="create-encargo-page">
      <h2>Crear Encargo</h2>
      {error && <p className="error">{error}</p>}
      <Form
        fields={formFields}
        onSubmit={handleSubmit}
        buttonText="Crear Encargo"
        backgroundColor="#f9f9f9"
      />
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default CreateEncargoPage;
