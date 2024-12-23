import { useEffect, useRef, useState } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import "tabulator-tables/dist/css/tabulator.min.css";
import '@styles/table.css';

function useTable({ data, columns, filter, dataToFilter, initialSortName, onSelectionChange }) {
    const tableRef = useRef(null);
    const [table, setTable] = useState(null);
    const [isTableBuilt, setIsTableBuilt] = useState(false);

    useEffect(() => {
        if (!Array.isArray(data) || !Array.isArray(columns)) {
            console.warn("Datos o columnas no son válidos. Asegúrate de que ambos sean arreglos.");
            return;
        }

        if (data.length === 0 || columns.length === 0) {
            console.warn("Datos o columnas están vacíos. No se puede construir la tabla.");
            return;
        }

        console.log("Datos de la tabla:", data);
        console.log("Columnas de la tabla:", columns);

        if (tableRef.current) {
            // Verificar si ya existe una columna con formatter "rowSelection"
            const hasRowSelection = columns.some((col) => col.formatter === "rowSelection");

            // Si no existe, añadir la columna de selección al principio
            const updatedColumns = hasRowSelection
                ? columns
                : [
                    {
                        formatter: "rowSelection",
                        titleFormatter: false,
                        hozAlign: "center",
                        headerSort: false,
                        cellClick: (e, cell) => {
                            // Aquí seleccionamos la fila al hacer clic en cualquier parte de la celda
                            cell.getRow().toggleSelect();
                        },
                        formatterParams: {
                            elementAttributes: (row) => {
                                const data = row.getData?.() || row._row?.data;
                                return {
                                    id: `select-row-${data?.id || Math.random()}`,
                                    name: `select-row-${data?.id || Math.random()}`,
                                };
                            },
                        },
                    },
                    ...columns,
                ];

            // Crear la tabla con Tabulator
            const tabulatorTable = new Tabulator(tableRef.current, {
                data: data,
                columns: updatedColumns,
                layout: "fitColumns",
                responsiveLayout: "collapse",
                pagination: true,
                paginationSize: 6,
                selectableRows: true, // Asegurarse de que las filas sean seleccionables
                rowHeight: 46,
                langs: {
                    "default": {
                        "pagination": {
                            "first": "Primero",
                            "prev": "Anterior",
                            "next": "Siguiente",
                            "last": "Último",
                        },
                    },
                },
                initialSort: [{ column: initialSortName || columns[0]?.field, dir: "asc" }],
                rowSelectionChanged: (rows) => {
                    const selectedRowsData = rows.map((row) => {
                        if (row && typeof row.getData === 'function') {
                            return row.getData();
                        } else {
                            console.warn("El objeto seleccionado no tiene método getData. Usando datos directamente:", row);
                            return row;
                        }
                    });

                    console.log("Datos de las filas seleccionadas:", selectedRowsData);

                    if (onSelectionChange) {
                        onSelectionChange(selectedRowsData);  // Enviar los datos seleccionados al manejador
                    }
                },
            });

            tabulatorTable.on("tableBuilt", () => {
                console.log("La tabla se construyó correctamente.");
                setIsTableBuilt(true);
            });

            return () => {
                tabulatorTable.destroy();
                setIsTableBuilt(false);
                setTable(null);
            };
        }
    }, [columns, data, initialSortName, onSelectionChange]);

    useEffect(() => {
        if (table && isTableBuilt && Array.isArray(data)) {
            table.replaceData(data);
        }
    }, [data, table, isTableBuilt]);

    useEffect(() => {
        if (table && isTableBuilt) {
            if (filter) {
                table.setFilter(dataToFilter, "like", filter);
            } else {
                table.clearFilter();
            }
            table.redraw();
        }
    }, [filter, table, dataToFilter, isTableBuilt]);

    return { tableRef };
}

export default useTable;
