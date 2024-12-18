import Table from '@components/Table';  
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useState, useCallback } from 'react';
import '@styles/encargos.css';
import useEncargo from '@hooks/encargo/useEncargo';
import useEditEncargo from '@hooks/encargo/useEditEncargo';  
import useDeleteEncargo from '@hooks/encargo/useDeleteEncargo';  

const Encargos = () => {
  const { encargos, fetchEncargos, setEncargos } = useEncargo();
  const [filterCliente, setFilterCliente] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataEncargo,
    setDataEncargo
  } = useEditEncargo(setEncargos);

  const { handleDelete } = useDeleteEncargo(fetchEncargos, setDataEncargo);

  const handleClienteFilterChange = (e) => {
    setFilterCliente(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedEncargos) => {
    setDataEncargo(selectedEncargos);
  }, [setDataEncargo]);

  const columns = [
    { title: "ID", field: "id", width: 100, responsive: 0 },
    { title: "Cliente", field: "nombreCliente", width: 350, responsive: 3 },
    { title: "Mecánico", field: "mecanicoAsignado", width: 250, responsive: 2 },
    { title: "Tarea", field: "tarea", width: 300, responsive: 2 },
    { title: "Horas", field: "horas", width: 150, responsive: 2 },
    { title: "Estado", field: "estado", width: 200, responsive: 2 }
  ];

  return (
    <div className='main-container'>
      <div className='table-container'>
        <div className='top-table'>
          <h1 className='title-table'>Encargos</h1>
          <div className='filter-actions'>
            <Search value={filterCliente} onChange={handleClienteFilterChange} placeholder={'Filtrar por cliente'} />
            <button onClick={handleClickUpdate} disabled={dataEncargo.length === 0}>
              {dataEncargo.length === 0 ? (
                <img src={UpdateIconDisable} alt="edit-disabled" />
              ) : (
                <img src={UpdateIcon} alt="edit" />
              )}
            </button>
            <button className='delete-encargo-button' disabled={dataEncargo.length === 0} onClick={() => handleDelete(dataEncargo)}>
              {dataEncargo.length === 0 ? (
                <img src={DeleteIconDisable} alt="delete-disabled" />
              ) : (
                <img src={DeleteIcon} alt="delete" />
              )}
            </button>
          </div>
        </div>
        <Table
          data={encargos}
          columns={columns}
          filter={filterCliente}
          dataToFilter={'nombreCliente'}
          initialSortName={'nombreCliente'}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataEncargo} action={handleUpdate} />
    </div>
  );
};

export default Encargos;
