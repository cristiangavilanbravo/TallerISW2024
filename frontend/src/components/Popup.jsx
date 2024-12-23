import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

export default function Popup({ show, setShow, data, action, type }) {
    const formData = data && data.length > 0 ? data[0] : {};

    const formConfigs = {
        editUser: {
            title: "Editar usuario",
            fields: [
                {
                    label: "Nombre completo",
                    name: "nombreCompleto",
                    defaultValue: formData.nombreCompleto || "",
                    placeholder: 'Diego Alexis Salazar Jara',
                    fieldType: 'input',
                    type: "text",
                    required: true,
                    minLength: 15,
                    maxLength: 50,
                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                    patternMessage: "Debe contener solo letras y espacios",
                },
                {
                    label: "Correo electrónico",
                    name: "email",
                    defaultValue: formData.email || "",
                    placeholder: 'example@gmail.cl',
                    fieldType: 'input',
                    type: "email",
                    required: true,
                    minLength: 15,
                    maxLength: 30,
                },
                {
                    label: "Rut",
                    name: "rut",
                    defaultValue: formData.rut || "",
                    placeholder: '21.308.770-3',
                    fieldType: 'input',
                    type: "text",
                    minLength: 9,
                    maxLength: 12,
                    pattern: /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/,
                    patternMessage: "Debe ser xx.xxx.xxx-x o xxxxxxxx-x",
                    required: true,
                },
                {
                    label: "Rol",
                    name: "rol",
                    fieldType: 'select',
                    options: [
                        { value: 'administrador', label: 'Administrador' },
                        { value: 'usuario', label: 'Usuario' },
                        { value: 'mecanico', label: 'Mecánico' },
                        { value: 'encargado de bodega', label: 'Encargado de Bodega' },
                        { value: 'encargado de local', label: 'Encargado de Local' },
                    ],
                    required: true,
                    defaultValue: formData.rol || "",
                },
                {
                    label: (
                        <span>
                            Nueva contraseña
                            <span className='tooltip-icon'>
                                <img src={QuestionIcon} alt="info" />
                                <span className='tooltip-text'>Este campo es opcional</span>
                            </span>
                        </span>
                    ),
                    name: "newPassword",
                    placeholder: "**********",
                    fieldType: 'input',
                    type: "password",
                    required: false,
                    minLength: 8,
                    maxLength: 26,
                    pattern: /^[a-zA-Z0-9]+$/,
                    patternMessage: "Debe contener solo letras y números",
                },
            ],
            buttonText: "Editar usuario",
        },
        editEncargo: {
            title: "Editar encargo",
            fields: [
                {
                    label: "Cliente",
                    name: "nombreCliente",
                    defaultValue: formData.nombreCliente || "",
                    placeholder: 'Juan Pérez',
                    fieldType: 'input',
                    type: "text",
                    required: true,
                },
                {
                    label: "Teléfono",
                    name: "telCliente",
                    defaultValue: formData.telCliente || "",
                    placeholder: '912345678',
                    fieldType: 'input',
                    type: "text",
                    required: true,
                    pattern: /^[0-9]{9}$/,
                    patternMessage: "Debe ser un número de 9 dígitos",
                },
                {
                    label: "Tarea",
                    name: "tarea",
                    defaultValue: formData.tarea || "",
                    placeholder: 'Cambio de aceite',
                    fieldType: 'input',
                    type: "text",
                    required: true,
                },
                {
                    label: "Detalle",
                    name: "detalle",
                    defaultValue: formData.detalle || "",
                    placeholder: 'Detalles adicionales',
                    fieldType: 'textarea',
                    required: false,
                },
                {
                    label: "Estado",
                    name: "estado",
                    fieldType: 'select',
                    options: [
                        { value: 'pendiente', label: 'Pendiente' },
                        { value: 'completado', label: 'Completado' },
                        { value: 'cancelado', label: 'Cancelado' },
                    ],
                    required: true,
                    defaultValue: formData.estado || "pendiente",
                },
            ],
            buttonText: "Editar encargo",
        },
    };

    const config = formConfigs[type];

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>
                        {config ? (
                            <Form
                                title={config.title}
                                fields={config.fields}
                                onSubmit={action}
                                buttonText={config.buttonText}
                                backgroundColor={'#fff'}
                            />
                        ) : (
                            <div>
                                <h2>{data?.mensaje || "Acción completada"}</h2>
                                <button className="back-button" onClick={() => setShow(false)}>
                                    Aceptar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
