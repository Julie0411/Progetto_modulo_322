import React, { createContext, useState } from 'react';

export const GradesContext = createContext();

export const GradeProvider = ({ children }) => {
    const [grades, setGrades] = useState([]);
    const [sortAscending, setSortAscending] = useState(true);

    const addGrade = (item) => {
        setGrades(prev => {
            const newGrades = [...prev, {
                id: Date.now(),
                subject: item.subjectTitle,
                grade: item.grade,
                text: item.text,
                time: item.time
            }];
            return newGrades;
        });
    };

    const deleteGrade = (id) => {
        setGrades(prev => prev.filter(g => g.id !== id));
    };

    return (
        <GradesContext.Provider
            value={{
                grades,
                addGrade,
                deleteGrade,
                sortAscending,
                setSortAscending
            }}
        >
            {children}
        </GradesContext.Provider>
    );

};
