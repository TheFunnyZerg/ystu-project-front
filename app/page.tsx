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



const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [rows, setRows] = useState([
    { name: "Ядро ЯГТУ", color: "#F4F65B" },
    { name: "Ядро ИЦС", color: "#9CF9A0" },
    { name: "Ядро УГСН", color: "#7497FF" },
  ]);
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
    setRows([...rows, { name: newCoreName, color: newCoreColor }]);
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
            <li>Дисциплина 1</li>
            <li>Дисциплина 2</li>
            <li>Дисциплина 3</li>
            <li>Дисциплина 4</li>
            <li>Дисциплина 5</li>
            <li>Дисциплина 6</li>
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
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td style={{background: row.color}}>{row.name}</td>
                    {Array.from({ length: 8 }).map((_, colIndex) => (
                      <td key={colIndex}>
                        <textarea className={table.cell_text} cols={30} onInput={handleTextInput}/>
                      </td>  
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className={table.addRow} onClick={openModal}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 17.1429H17.1429V30H12.8571V17.1429H0V12.8571H12.8571V0H17.1429V12.8571H30V17.1429Z" fill="#343434"/>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </main>

          {/* Боковая панель атрибутов */}
          <aside className={attributes["attributes"]}>
            <div className={attributes.title}>Атрибуты дисциплин</div>

            {/* Зачётные единицы */}
            <label>Зачётные единицы</label>
            <input type="number" defaultValue={1} />

            {/* Вид зачёта */}
            <label>Вид зачёта</label>
            <select>
              <option>Экзамен</option>
              <option>Зачет</option>
            </select>

            {/* Чекбоксы с заголовками рядом */}
            <div className={attributes["checkbox-row"]}>
              <input type="checkbox" id="courseWork" />
              <label htmlFor="courseWork">Наличие курсовой</label>
            </div>

            <div className={attributes["checkbox-row"]}>
              <input type="checkbox" id="practicalWork" />
              <label htmlFor="practicalWork">Наличие пр. работ</label>
            </div>

            {/* Выпускающая кафедра */}
            <label>Выпускающая кафедра</label>
            <select>
              <option>Кафедра 1</option>
              <option>Кафедра 2</option>
            </select>

            {/* Код компетенции */}
            <label>Код компетенции</label>
            <select>
              <option>Компетенция 1</option>
              <option>Компетенция 2</option>
            </select>

            {/* Часы по лекционным */}
            <label>Часы по лекционным</label>
            <input type="number" defaultValue={0} />

            {/* Часы по лабораторным */}
            <label>Часы по лабораторным</label>
            <input type="number" defaultValue={0} />

            {/* Часы по практическим */}
            <label>Часы по практическим</label>
            <input type="number" defaultValue={0} />
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
