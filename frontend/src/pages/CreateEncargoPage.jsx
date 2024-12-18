import Form from '../components/Form'; 
import { useCreateEncargo } from '@hooks/encargo/useCreateEncargo';

const EncargosCreate = () => {
    const { createEncargo } = useCreateEncargo();

    const handleFormSubmit = async (data) => {
        const result = await createEncargo(data);
        if (result) {
            alert('Encargo creado exitosamente');
        } else {
            alert('Error al crear el encargo');
        }
    };

    const fields = [
        {
            name: 'cliente',
            label: 'Cliente',
            type: 'text',
            fieldType: 'input',
            required: true,
            placeholder: 'Nombre del cliente',
        },
        {
            name: 'mecanico',
            label: 'Mecánico',
            type: 'text',
            fieldType: 'input',
            required: true,
            placeholder: 'Nombre del mecánico',
        },
        {
            name: 'tarea',
            label: 'Tarea',
            type: 'text',
            fieldType: 'input',
            required: true,
            placeholder: 'Descripción de la tarea',
        },
        {
            name: 'horas',
            label: 'Horas',
            type: 'number',
            fieldType: 'input',
            required: true,
            placeholder: 'Número de horas',
        },
    ];

    return (
        <div className="create-encargo-container">
            <h1>Crear Encargo</h1>
            <Form
                title="Nuevo Encargo"
                fields={fields}
                buttonText="Crear Encargo"
                onSubmit={handleFormSubmit}
                backgroundColor="#f4f4f4"
            />
        </div>
    );
};

export default EncargosCreate;
