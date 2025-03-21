"use client";

import React, { useState } from "react";
import Head from "next/head";
import Main from "../styles/Main.module.css";
import Attributes from "../styles/Attributes.module.css";
import Modal from "../styles/Modal.module.css";
import Header from "../styles/Header.module.css";
import Sidebar from "../styles/Sidebar.module.css";
import ContentWrapper from "../styles/ContentWrapper.module.css";
import Table from "../styles/Table.module.css";

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
    if ((e.target as HTMLDivElement).className === Modal.modal) {
      setIsModalOpen(false);
    }
  };

  const addRow = () => {
    const newCoreName = (document.getElementById("newCoreName") as HTMLInputElement).value;
    const newCoreColor = (document.getElementById("newCoreColor") as HTMLInputElement).value;
    setRows([...rows, { name: newCoreName, color: newCoreColor }]);
    setIsModalOpen(false);
  };

  return (
    <div className={Main.container}>
      <Head>
        <title>Учебный план</title>
      </Head>

      {/* Хедер */}
      <header className={Header}>
      <img src="/images/logo.png" alt="Логотип" className={Header.logo} />
        <div className={Header["file-info"]}>
          <div className={Header["file-name"]}>Наименование файла</div>
          <div className={Header["file-buttons"]}>
            <button>Файл</button>
            <button>Вид</button>
          </div>
        </div>
      </header>

      {/* Основной контейнер для сайдбара и контента */}
      <div className={Main["main-content"]}>
        {/* Сайдбар */}
        <aside className={Sidebar.sidebar}>
          <div className={Sidebar["discipline-list-title"]}>Список дисциплин</div>
          <ul>
            <li className={Sidebar.active}>Дисциплина 1</li>
          </ul>
          <button className={Sidebar.addButton}>Добавить область объединения дисциплин</button>
        </aside>

        {/* Контейнер для основного контента и боковой панели атрибутов */}
        <div className={ContentWrapper["content-wrapper"]}>
          {/* Основной контент */}
          <main className={Table.main}>
            <table className={Table.table}>
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
                  </tr>
                ))}
                <tr>
                  <td className={Table.addRow} onClick={openModal}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 17.1429H17.1429V30H12.8571V17.1429H0V12.8571H12.8571V0H17.1429V12.8571H30V17.1429Z" fill="#343434"/>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </main>

          {/* Боковая панель атрибутов */}
          <aside className={Attributes.attributes}>
            <div className={ModalContent.title}>Атрибуты дисциплин</div>

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
            <div className={Attributes["checkbox-row"]}>
              <input type="checkbox" id="courseWork" />
              <label htmlFor="courseWork">Наличие курсовой</label>
            </div>

            <div className={Attributes["checkbox-row"]}>
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
        <div className={Modal.modal} onClick={closeModal}>
          <div className={ModalContent.modalContent}>
            <div>
              <p className={ModalContent.title}>Добавить ядро</p>
              <label htmlFor="newCoreName">Наименование</label>
              <input type="text" id="newCoreName" defaultValue={"Ядро ИЦС"} />
              <label htmlFor="newCoreColor">Выбор цвета</label>
              <input type="color" id="newCoreColor" defaultValue={"#FF0000"} />
              <button className={Sidebar.addButton} onClick={addRow}>Добавить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
