import { useState } from 'react';

export const useGrades = () => {
    const [grades, setGrades] = useState([]);

    const addGrade = (subjectTitle, newGrade) => {
        setGrades(prev => {
            const existingSubject = prev.find(subject => subject.title === subjectTitle);
            if (existingSubject) {
                return prev.map(subject =>
                    subject.title === subjectTitle
                        ? { ...subject, grades: [...subject.grades, newGrade] }
                        : subject
                );
            }
            return [...prev, { title: subjectTitle, grades: [newGrade] }];
        });
    };

    const deleteGrade = (subjectTitle, gradeToDelete) => {
        setGrades(prev => prev.map(subject =>
            subject.title === subjectTitle
                ? { ...subject, grades: subject.grades.filter(grade => grade.text !== gradeToDelete.text) }
                : subject
        ));
    };

    return { grades, addGrade, deleteGrade };
};
