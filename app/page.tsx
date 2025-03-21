"use client";

import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

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
    if ((e.target as HTMLDivElement).className === styles.modal) {
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
    <div className={styles.container}>
      <Head>
        <title>Учебный план</title>
      </Head>

      {/* Хедер */}
      <header className={styles.header}>
      <img src="/images/logo.png" alt="Логотип" className={styles.logo} />
        <div className={styles["file-info"]}>
          <div className={styles["file-name"]}>Наименование файла</div>
          <div className={styles["file-buttons"]}>
            <button>Файл</button>
            <button>Вид</button>
          </div>
        </div>
      </header>

      {/* Основной контейнер для сайдбара и контента */}
      <div className={styles["main-content"]}>
        {/* Сайдбар */}
        <aside className={styles.sidebar}>
          <div className={styles["discipline-list-title"]}>Список дисциплин</div>
          <ul>
            <li className={styles.active}>Дисциплина 1</li>
          </ul>
          <button className={styles.addButton}>Добавить область объединения дисциплин</button>
        </aside>

        {/* Контейнер для основного контента и боковой панели атрибутов */}
        <div className={styles["content-wrapper"]}>
          {/* Основной контент */}
          <main className={styles.main}>
            <table className={styles.table}>
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
                  <td className={styles.addRow} onClick={openModal}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 17.1429H17.1429V30H12.8571V17.1429H0V12.8571H12.8571V0H17.1429V12.8571H30V17.1429Z" fill="#343434"/>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </main>

          {/* Боковая панель атрибутов */}
          <aside className={styles.attributes}>
            <div className={styles.title}>Атрибуты дисциплин</div>

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
            <div className={styles["checkbox-row"]}>
              <input type="checkbox" id="courseWork" />
              <label htmlFor="courseWork">Наличие курсовой</label>
            </div>

            <div className={styles["checkbox-row"]}>
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
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <div>
              <p className={styles.title}>Добавить ядро</p>
              <label htmlFor="newCoreName">Наименование</label>
              <input type="text" id="newCoreName" defaultValue={"Ядро ИЦС"} />
              <label htmlFor="newCoreColor">Выбор цвета</label>
              <input type="color" id="newCoreColor" defaultValue={"#FF0000"} />
              <button className={styles.addButton} onClick={addRow}>Добавить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
