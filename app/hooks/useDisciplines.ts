import { useState } from "react";
import { Discipline } from "@/app/types";

export const useDisciplines = (setRows: (rows: any) => void) => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([
    {
      id: 1,
      name: "Дисциплина 1",
      credits: 1,
      examType: "Экзамен",
      hasCourseWork: false,
      hasPracticalWork: false,
      department: "Кибернетика",
      competenceCodes: ["3.2.4.8"],
      lectureHours: 36,
      labHours: 0,
      practicalHours: 18,
    },
    {
      id: 2,
      name: "Дисциплина 2",
      credits: 2,
      examType: "Зачет",
      hasCourseWork: true,
      hasPracticalWork: true,
      department: "Кафедра 1",
      competenceCodes: ["3.1.5.9"],
      lectureHours: 18,
      labHours: 18,
      practicalHours: 18,
    },
    {
      id: 3,
      name: "Дисциплина 3",
      credits: 3,
      examType: "Экзамен",
      hasCourseWork: false,
      hasPracticalWork: true,
      department: "Кафедра 2",
      competenceCodes: ["4.5.6.7"],
      lectureHours: 36,
      labHours: 36,
      practicalHours: 0,
    },
    {
      id: 4,
      name: "Дисциплина 4",
      credits: 2,
      examType: "Зачет",
      hasCourseWork: false,
      hasPracticalWork: false,
      department: "Кибернетика",
      competenceCodes: ["3.2.4.8"],
      lectureHours: 18,
      labHours: 0,
      practicalHours: 36,
    },
    {
      id: 5,
      name: "Дисциплина 5",
      credits: 4,
      examType: "Экзамен",
      hasCourseWork: true,
      hasPracticalWork: false,
      department: "Кафедра 1",
      competenceCodes: ["3.1.5.9"],
      lectureHours: 36,
      labHours: 36,
      practicalHours: 36,
    },
    {
      id: 6,
      name: "Дисциплина 6",
      credits: 3,
      examType: "Зачет",
      hasCourseWork: false,
      hasPracticalWork: true,
      department: "Кафедра 2",
      competenceCodes: ["4.5.6.7"],
      lectureHours: 36,
      labHours: 0,
      practicalHours: 36,
    },
  ]);
  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);

  const handleAttributeChange = (field: keyof Discipline, value: any) => {
    if (!selectedDiscipline) return;

    const updatedDisciplines = disciplines.map((disc) => {
      if (disc.id === selectedDiscipline.id) {
        return { ...disc, [field]: value };
      }
      return disc;
    });

    setDisciplines(updatedDisciplines);
    setSelectedDiscipline((prev) => prev && { ...prev, [field]: value });

    setRows((prevRows: any[]) =>
      prevRows.map((row) => ({
        ...row,
        data: row.data.map((cell: Discipline[]) =>
          cell.map((d) =>
            d.id === selectedDiscipline.id ? { ...d, [field]: value } : d,
          ),
        ),
      })),
    );
  };

  return {
    disciplines,
    selectedDiscipline,
    setSelectedDiscipline,
    handleAttributeChange,
  };
};
