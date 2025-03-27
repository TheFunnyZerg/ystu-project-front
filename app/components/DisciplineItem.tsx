"use client";

import React from "react";
import table from "@/styles/Table.module.css";
import {Discipline} from "@/app/types";

interface DisciplineItemProps {
    discipline: Discipline;
    onClick: () => void;
    onDragStart: () => void;
}

export const DisciplineItem = ({
                                   discipline,
                                   onClick,
                                   onDragStart,
                               }: DisciplineItemProps) => {
    return (
        <div
            className={table.disciplineItem}
            onClick={onClick}
            draggable
            onDragStart={onDragStart}
        >
            <div className={table.disciplineName}>{discipline.name}</div>
            <div className={table.disciplineInfo}>
                <span className={table.disciplineInfoItem}>{discipline.examType}</span>
                <span className={table.disciplineInfoItem}>{discipline.credits} ЗЕ</span>
                <span className={table.disciplineInfoItem}>{discipline.department}</span>
            </div>
        </div>
    );
};
