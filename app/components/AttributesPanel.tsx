"use client";

import React, { useRef } from "react";
import attributes from "@/styles/Attributes.module.css";
import {Discipline} from "@/app/types";

interface AttributesPanelProps {
    selectedDiscipline: Discipline | null;
    handleAttributeChange: (field: keyof Discipline, value: any) => void;
    competenceOptions: string[];
    handleAddCompetence: (competence: string) => void;
    handleRemoveCompetence: (competence: string) => void;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    showAllCompetences: boolean;
    setShowAllCompetences: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AttributesPanel = ({
                                    selectedDiscipline,
                                    handleAttributeChange,
                                    competenceOptions,
                                    handleAddCompetence,
                                    handleRemoveCompetence,
                                    searchQuery,
                                    setSearchQuery,
                                    showAllCompetences,
                                    setShowAllCompetences
                                }: AttributesPanelProps) => {
    const searchInputRef = useRef<HTMLDivElement>(null);

    return (
        <aside className={attributes["attributes"]}>
            <div className={attributes.title}>
                {selectedDiscipline
                    ? `Атрибуты: ${selectedDiscipline.name}`
                    : "Атрибуты дисциплин"}
            </div>

            <label>Зачётные единицы</label>
            <input
                type="number"
                value={selectedDiscipline?.credits || 1}
                onChange={(e) => handleAttributeChange("credits", parseInt(e.target.value))}
                disabled={!selectedDiscipline}
            />

            <label>Вид зачёта</label>
            <select
                value={selectedDiscipline?.examType || "Экзамен"}
                onChange={(e) => handleAttributeChange("examType", e.target.value)}
                disabled={!selectedDiscipline}
            >
                <option>Экзамен</option>
                <option>Зачет</option>
            </select>

            <div className={attributes["checkbox-row"]}>
                <input
                    type="checkbox"
                    id="courseWork"
                    checked={selectedDiscipline?.hasCourseWork || false}
                    onChange={(e) => handleAttributeChange("hasCourseWork", e.target.checked)}
                    disabled={!selectedDiscipline}
                />
                <label htmlFor="courseWork">Наличие курсовой</label>
            </div>

            <div className={attributes["checkbox-row"]}>
                <input
                    type="checkbox"
                    id="practicalWork"
                    checked={selectedDiscipline?.hasPracticalWork || false}
                    onChange={(e) => handleAttributeChange("hasPracticalWork", e.target.checked)}
                    disabled={!selectedDiscipline}
                />
                <label htmlFor="practicalWork">Наличие пр. работ</label>
            </div>

            <label>Выпускающая кафедра</label>
            <select
                value={selectedDiscipline?.department || "Кафедра 1"}
                onChange={(e) => handleAttributeChange("department", e.target.value)}
                disabled={!selectedDiscipline}
            >
                <option>Кибернетика</option>
                <option>Кафедра 1</option>
                <option>Кафедра 2</option>
            </select>

            <label>Коды компетенций</label>
            <div ref={searchInputRef}>
                <input
                    type="text"
                    placeholder="Поиск компетенций"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowAllCompetences(true)}
                    disabled={!selectedDiscipline}
                />
                {(searchQuery || showAllCompetences) && (
                    <div className={attributes["search-results"]}>
                        {competenceOptions
                            .filter(
                                (option) =>
                                    !selectedDiscipline?.competenceCodes.includes(option) &&
                                    (searchQuery ? option.includes(searchQuery) : true)
                            )
                            .map((option) => (
                                <div key={option} onClick={() => handleAddCompetence(option)}>
                                    {option}
                                    <span className={attributes["add-symbol"]}>+</span>
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <div className={attributes["competence-bricks"]}>
                {selectedDiscipline?.competenceCodes.sort().map((code) => (
                    <div key={code} onClick={() => handleRemoveCompetence(code)}>
                        {code}
                    </div>
                ))}
            </div>

            <label>Часы по лекционным</label>
            <input
                type="number"
                value={selectedDiscipline?.lectureHours || 0}
                onChange={(e) => handleAttributeChange("lectureHours", parseInt(e.target.value))}
                disabled={!selectedDiscipline}
            />

            <label>Часы по лабораторным</label>
            <input
                type="number"
                value={selectedDiscipline?.labHours || 0}
                onChange={(e) => handleAttributeChange("labHours", parseInt(e.target.value))}
                disabled={!selectedDiscipline}
            />

            <label>Часы по практическим</label>
            <input
                type="number"
                value={selectedDiscipline?.practicalHours || 0}
                onChange={(e) => handleAttributeChange("practicalHours", parseInt(e.target.value))}
                disabled={!selectedDiscipline}
            />
        </aside>
    );
};
