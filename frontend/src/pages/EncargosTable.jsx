import { useEffect, useState } from 'react';
import { getEncargos } from '../services/encargo.service.js';
import { getUserById } from '../services/user.service.js';
import Table from '../components/Table';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import useEditEncargo from '../hooks/encargo/useEditEncargo';
import useDeleteEncargo from '../hooks/encargo/useDeleteEncargo';
import '@styles/encargostable.css';

const EncargosTable = () => {
  const [encargos, setEncargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEncargos, setSelectedEncargos] = useState([]); // Estado para los encargos seleccionados

  const {
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    setSelectedEncargo,
    loading: editLoading, // Ahora puedes acceder al loading de la edición
    error: editError,     // Y al error de la edición
  } = useEditEncargo(setEncargos);
  
  const { handleDelete, loading: deleteLoading, error: deleteError } = useDeleteEncargo(setEncargos);

  const columns = [
    { title: 'ID', field: 'id', width: 50 },
    { title: 'Nombre del Cliente', field: 'nombreCliente', width: 200 },
    { title: 'Teléfono', field: 'telCliente', width: 150 },
    { title: 'Tarea', field: 'tarea', width: 250 },
    { title: 'Detalle', field: 'detalle', width: 300 },
    { title: 'Estado', field: 'estado', width: 100 },
    {
      title: 'Fecha',
      field: 'createdAt',
      formatter: (cell) => {
        const dateString = cell.getValue?.();
        if (!dateString) return 'Fecha no disponible';
        try {
          const fecha = new Date(dateString);
          return fecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } catch {
          return 'Fecha inválida';
        }
      },
    },
    { title: 'Mecánico Asignado', field: 'nombreMecanico', width: 200 },
    {
      title: 'Acciones',
      formatter: () => '<button class="btn-edit">Editar</button>',
      cellClick: (e, cell) => {
        const rowData = cell.getRow().getData(); // Obtén los datos directamente de la fila
        setSelectedEncargo(rowData); // Asigna el encargo seleccionado
        setIsPopupOpen(true); // Muestra el popup
      },
      hozAlign: 'center',
      headerSort: false,
    },
  ];

  useEffect(() => {
    const fetchEncargos = async () => {
      try {
        setLoading(true);
        const fetchedEncargos = await getEncargos();
        const processedEncargos = await Promise.all(
          fetchedEncargos.map(async (encargo) => {
            if (encargo.mecanicoAsignado) {
              const mecanico = await getUserById(encargo.mecanicoAsignado);
              return {
                ...encargo,
                nombreMecanico: mecanico?.nombre || 'Desconocido',
              };
            }
            return { ...encargo, nombreMecanico: 'No asignado' };
          })
        );
        setEncargos(processedEncargos);
      } catch (err) {
        console.error('Error al cargar los encargos:', err);
        setError('Hubo un error al cargar los encargos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEncargos();
  }, []);

  const handleSelectionChange = (selectedRows) => {
    console.log("Filas seleccionadas:", selectedRows);  // Verificar qué datos se están pasando
    setSelectedEncargos(selectedRows);
  };

  if (loading || editLoading || deleteLoading) {
    return <div className="encargos-loading">Cargando encargos...</div>;
  }

  if (error || editError || deleteError) {
    return <div className="encargos-error">{error || editError || deleteError}</div>;
  }

  return (
    <div className="encargos-table-container">
      <h1 className="encargos-title">Lista de Encargos</h1>
      <div className="actions-table">
        <button
          onClick={() => {
            if (selectedEncargos.length === 0) return; // Si no hay nada seleccionado, no hace nada
            handleDelete(selectedEncargos.map((encargo) => encargo.id)); // Usar los ids de los encargos seleccionados
          }}
          disabled={selectedEncargos.length === 0}
        >
          <img src={DeleteIcon} alt="delete" />
          Eliminar
        </button>
      </div>
      {encargos.length === 0 ? (
        <div className="encargos-empty">No hay encargos creados.</div>
      ) : (
        <Table
          data={encargos}
          columns={columns}
          onSelectionChange={handleSelectionChange} // Manejar la selección
        />
      )}
      <Popup
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        action={handleUpdate}
        data={setSelectedEncargo} 
      />
    </div>
  );
};

export default EncargosTable;
