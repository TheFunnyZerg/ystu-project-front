import { Discipline, TableRow } from "@/app/types";
import React, { useState } from "react";

export const useDragAndDrop = (
    rows: TableRow[],
    setRows: React.Dispatch<React.SetStateAction<TableRow[]>>,
    disciplines: Discipline[]
) => {
    const [draggedDiscipline, setDraggedDiscipline] = useState<Discipline | null>(null);

    const handleDragStart = (
        discipline: Discipline,
        sourceRowIndex?: number,
        sourceColIndex?: number
    ) => {
        const actualDiscipline = disciplines.find(d => d.id === discipline.id) || discipline;
        setDraggedDiscipline(actualDiscipline);

        if (sourceRowIndex !== undefined && sourceColIndex !== undefined) {
            actualDiscipline.sourcePosition = {
                rowIndex: sourceRowIndex,
                colIndex: sourceColIndex
            };
        }
    };

    const handleDrop = (
        e: React.DragEvent<HTMLTableCellElement>,
        rowIndex: number,
        colIndex: number
    ) => {
        e.preventDefault();
        if (!draggedDiscipline) return;

        const updatedRows = [...rows];

        if (draggedDiscipline.sourcePosition) {
            const { rowIndex: sri, colIndex: sci } = draggedDiscipline.sourcePosition;
            updatedRows[sri].data[sci] = updatedRows[sri].data[sci]
                .filter(d => d.id !== draggedDiscipline.id);
        }

        updatedRows[rowIndex].data[colIndex] = [
            ...updatedRows[rowIndex].data[colIndex],
            draggedDiscipline,
        ];

        setRows(updatedRows);
        setDraggedDiscipline(null);
    };

    return {
        handleDragStart,
        handleDrop,
        handleDragOver: (e: React.DragEvent<HTMLTableCellElement>) => e.preventDefault()
    };
};
