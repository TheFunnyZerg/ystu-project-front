"use client";

import React from "react";
import sidebar from "@/styles/Sidebar.module.css";

interface SidebarProps {
  disciplines: any[];
  selectedDiscipline: any;
  handleDisciplineClick: (discipline: any) => void;
  handleDragStart: (discipline: any) => void;
}

export const Sidebar = ({
  disciplines,
  selectedDiscipline,
  handleDisciplineClick,
  handleDragStart,
}: SidebarProps) => {
  return (
    <aside className={sidebar["sidebar"]}>
      <div className={sidebar["discipline-list-title"]}>Список дисциплин</div>
      <ul>
        {disciplines.map((discipline) => (
          <li
            key={discipline.id}
            draggable
            onDragStart={() => handleDragStart(discipline)}
            onClick={() => handleDisciplineClick(discipline)}
            className={`${sidebar.draggableItem} ${
              selectedDiscipline?.id === discipline.id ? sidebar.selected : ""
            }`}
          >
            {discipline.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
