"use client";

import React, { useState } from "react";
import Head from "next/head";
import header from "../styles/Header.module.css";
import attributes from "../styles/Attributes.module.css";
import table from "../styles/Table.module.css";
import container from "../styles/Container.module.css";
import mainContent from "../styles/MainContent.module.css";
import modal from "../styles/Modal.module.css";
import modalContent from "../styles/ModalContent.module.css";
import sidebar from "../styles/Sidebar.module.css";

interface Discipline {
  id: number;
  name: string;
  credits: number;
  examType: string;
  hasCourseWork: boolean;
  hasPracticalWork: boolean;
  department: string;
  competenceCode: string;
  lectureHours: number;
  labHours: number;
  practicalHours: number;
}

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [rows, setRows] = useState<{ name: string; color: string; data: Discipline[][] }[]>([
    { name: "Ядро ЯГТУ", color: "#F4F65B", data: Array(8).fill([]).map(() => []) },
    { name: "Ядро ИЦС", color: "#9CF9A0", data: Array(8).fill([]).map(() => []) },
    { name: "Ядро УГСН", color: "#7497FF", data: Array(8).fill([]).map(() => []) },
  ]);

  const [disciplines, setDisciplines] = useState<Discipline[]>([
    { 
      id: 1, 
      name: "Дисциплина 1", 
      credits: 1, 
      examType: "Экзамен", 
      hasCourseWork: false, 
      hasPracticalWork: false, 
      department: "Кибернетика", 
      competenceCode: "3.2.4.8", 
      lectureHours: 36, 
      labHours: 0, 
      practicalHours: 18 
    },
    { 
      id: 2, 
      name: "Дисциплина 2", 
      credits: 2, 
      examType: "Зачет", 
      hasCourseWork: true, 
      hasPracticalWork: true, 
      department: "Кафедра 1", 
      competenceCode: "3.1.5.9", 
      lectureHours: 18, 
      labHours: 18, 
      practicalHours: 18 
    },
    { 
      id: 3, 
      name: "Дисциплина 3", 
      credits: 3, 
      examType: "Экзамен", 
      hasCourseWork: false, 
      hasPracticalWork: true, 
      department: "Кафедра 2", 
      competenceCode: "4.5.6.7", 
      lectureHours: 36, 
      labHours: 36, 
      practicalHours: 0 
    },
    { 
      id: 4, 
      name: "Дисциплина 4", 
      credits: 2, 
      examType: "Зачет", 
      hasCourseWork: false, 
      hasPracticalWork: false, 
      department: "Кибернетика", 
      competenceCode: "3.2.4.8", 
      lectureHours: 18, 
      labHours: 0, 
      practicalHours: 36 
    },
    { 
      id: 5, 
      name: "Дисциплина 5", 
      credits: 4, 
      examType: "Экзамен", 
      hasCourseWork: true, 
      hasPracticalWork: false, 
      department: "Кафедра 1", 
      competenceCode: "3.1.5.9", 
      lectureHours: 36, 
      labHours: 36, 
      practicalHours: 36 
    },
    { 
      id: 6, 
      name: "Дисциплина 6", 
      credits: 3, 
      examType: "Зачет", 
      hasCourseWork: false, 
      hasPracticalWork: true, 
      department: "Кафедра 2", 
      competenceCode: "4.5.6.7", 
      lectureHours: 36, 
      labHours: 0, 
      practicalHours: 36 
    },
  ]);

  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [draggedDiscipline, setDraggedDiscipline] = useState<Discipline | null>(null);

  const handleDisciplineClick = (discipline: Discipline) => {
    setSelectedDiscipline(discipline);
  };

  const handleDragStart = (discipline: Discipline) => {
    setDraggedDiscipline(discipline);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLTableCellElement>, rowIndex: number, colIndex: number) => {
    e.preventDefault();
    if (!draggedDiscipline) return;

    const updatedRows = [...rows];
    updatedRows[rowIndex].data[colIndex] = [...updatedRows[rowIndex].data[colIndex], draggedDiscipline];
    setRows(updatedRows);
    setDraggedDiscipline(null);
  };

  const handleAttributeChange = (field: keyof Discipline, value: any) => {
    if (!selectedDiscipline) return;

    const updatedDisciplines = disciplines.map(disc => 
      disc.id === selectedDiscipline.id ? { ...disc, [field]: value } : disc
    );

    setDisciplines(updatedDisciplines);
    
    setSelectedDiscipline({ ...selectedDiscipline, [field]: value });
    
    const updatedRows = rows.map(row => {
      const updatedData = row.data.map(cell => 
        cell.map(cellDisc => 
          cellDisc.id === selectedDiscipline.id ? { ...cellDisc, [field]: value } : cellDisc
        )
      );
      return { ...row, data: updatedData };
    });
    
    setRows(updatedRows);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).className === modal.modal) {
      setIsModalOpen(false);
    }
  };

  const addRow = () => {
    const newCoreName = (document.getElementById("newCoreName") as HTMLInputElement).value;
    const newCoreColor = (document.getElementById("newCoreColor") as HTMLInputElement).value;

    const newRow = {
      name: newCoreName,
      color: newCoreColor,
      data: Array.from({ length: 8 }, () => []),
    };

    setRows([...rows, newRow]);
    setIsModalOpen(false);
  };


  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className={container["container"]}>
      <Head>
        <title>Учебный план</title>
      </Head>

      {/* Хедер */}
      <header className={header["header"]}>
      <img src="/images/logo.png" alt="Логотип" className={header.logo} />
        <div className={header["file-info"]}>
          <div className={header["file-name"]}>Наименование файла</div>
          <div className={header["file-buttons"]}>
            <button>Файл</button>
            <button>Вид</button>
          </div>
        </div>
      </header>

      {/* Основной контейнер для сайдбара и контента */}
      <div className={mainContent["main-content"]}>
        {/* Сайдбар */}
        <aside className={sidebar["sidebar"]}>
          <div className={sidebar["discipline-list-title"]}>Список дисциплин</div>
          <ul>
            {disciplines.map((discipline) => (
                <li
                    key={discipline.id}
                    draggable
                    onDragStart={() => handleDragStart(discipline)}
                    onClick={() => handleDisciplineClick(discipline)}
                    className={`${sidebar.draggableItem} ${selectedDiscipline?.id === discipline.id ? sidebar.selected : ''}`}
                >
                  {discipline.name}
                </li>
            ))}
          </ul>
          <button className={sidebar.addButton}>Добавить область объединения дисциплин</button>
        </aside>

        {/* Контейнер для основного контента и боковой панели атрибутов */}
        <div className={table["content-wrapper"]}>
          {/* Основной контент */}
          <main className={table.main}>
            <table className={table["table"]}>
              <thead>
              <tr>
                <th></th>
                <th>Семестр 1</th>
                <th>Семестр 2</th>
                <th>Семестр 3</th>
                <th>Семестр 4</th>
                <th>Семестр 5</th>
                <th>Семестр 6</th>
                <th>Семестр 7</th>
                <th>Семестр 8</th>
              </tr>
              </thead>
              <tbody>
              {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td style={{background: row.color}}>{row.name}</td>
                    {row.data.map((cell, colIndex) => (
                        <td key={colIndex}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, rowIndex, colIndex)}>
                          {cell.map((discipline, index) => (
                              <div 
                                key={index} 
                                className={table.disciplineItem}
                                onClick={() => handleDisciplineClick(discipline)}
                              >
                                {discipline.name}
                              </div>
                          ))}
                        </td>
                    ))}
                  </tr>
              ))}
              <tr>
                <td className={table.addRow} onClick={openModal}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 17.1429H17.1429V30H12.8571V17.1429H0V12.8571H12.8571V0H17.1429V12.8571H30V17.1429Z"
                          fill="#343434"/>
                  </svg>
                </td>
              </tr>
              </tbody>
            </table>
          </main>

          {/* Боковая панель атрибутов */}
          <aside className={attributes["attributes"]}>
            <div className={attributes.title}>
              {selectedDiscipline ? `Атрибуты: ${selectedDiscipline.name}` : 'Атрибуты дисциплин'}
            </div>

            {/* Зачётные единицы */}
            <label>Зачётные единицы</label>
            <input 
              type="number" 
              value={selectedDiscipline?.credits || 1}
              onChange={(e) => handleAttributeChange('credits', parseInt(e.target.value))}
              disabled={!selectedDiscipline}
            />

            {/* Вид зачёта */}
            <label>Вид зачёта</label>
            <select 
              value={selectedDiscipline?.examType || 'Экзамен'}
              onChange={(e) => handleAttributeChange('examType', e.target.value)}
              disabled={!selectedDiscipline}
            >
              <option>Экзамен</option>
              <option>Зачет</option>
            </select>

            {/* Чекбоксы с заголовками рядом */}
            <div className={attributes["checkbox-row"]}>
              <input 
                type="checkbox" 
                id="courseWork" 
                checked={selectedDiscipline?.hasCourseWork || false}
                onChange={(e) => handleAttributeChange('hasCourseWork', e.target.checked)}
                disabled={!selectedDiscipline}
              />
              <label htmlFor="courseWork">Наличие курсовой</label>
            </div>

            <div className={attributes["checkbox-row"]}>
              <input 
                type="checkbox" 
                id="practicalWork" 
                checked={selectedDiscipline?.hasPracticalWork || false}
                onChange={(e) => handleAttributeChange('hasPracticalWork', e.target.checked)}
                disabled={!selectedDiscipline}
              />
              <label htmlFor="practicalWork">Наличие пр. работ</label>
            </div>

            {/* Выпускающая кафедра */}
            <label>Выпускающая кафедра</label>
            <select 
              value={selectedDiscipline?.department || 'Кафедра 1'}
              onChange={(e) => handleAttributeChange('department', e.target.value)}
              disabled={!selectedDiscipline}
            >
              <option>Кибернетика</option>
              <option>Кафедра 1</option>
              <option>Кафедра 2</option>
            </select>

            {/* Код компетенции */}
            <label>Код компетенции</label>
            <select 
              value={selectedDiscipline?.competenceCode || 'Компетенция 1'}
              onChange={(e) => handleAttributeChange('competenceCode', e.target.value)}
              disabled={!selectedDiscipline}
            >
              <option>3.2.4.8</option>
              <option>3.1.5.9</option>
              <option>4.5.6.7</option>
            </select>

            {/* Часы по лекционным */}
            <label>Часы по лекционным</label>
            <input 
              type="number" 
              value={selectedDiscipline?.lectureHours || 0}
              onChange={(e) => handleAttributeChange('lectureHours', parseInt(e.target.value))}
              disabled={!selectedDiscipline}
            />

            {/* Часы по лабораторным */}
            <label>Часы по лабораторным</label>
            <input 
              type="number" 
              value={selectedDiscipline?.labHours || 0}
              onChange={(e) => handleAttributeChange('labHours', parseInt(e.target.value))}
              disabled={!selectedDiscipline}
            />

            {/* Часы по практическим */}
            <label>Часы по практическим</label>
            <input 
              type="number" 
              value={selectedDiscipline?.practicalHours || 0}
              onChange={(e) => handleAttributeChange('practicalHours', parseInt(e.target.value))}
              disabled={!selectedDiscipline}
            />
          </aside>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className={modal["modal"]} onClick={closeModal}>
          <div className={modalContent["modalContent"]}>
            <div>
              <p className={modalContent.title}>Добавить ядро</p>
              <label htmlFor="newCoreName">Наименование</label>
              <input type="text" id="newCoreName" defaultValue={"Ядро ИЦС"} />
              <label htmlFor="newCoreColor">Выбор цвета</label>
              <input type="color" id="newCoreColor" defaultValue={"#FF0000"} />
              <button className={sidebar.addButton} onClick={addRow}>Добавить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
