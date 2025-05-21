import React, { createContext, useState } from 'react';

export const EvaluationsContext = createContext();

export const EvaluationsProvider = ({ children }) => {
    const [evaluations, setEvaluations] = useState([]);

    const addEvaluation = (item) => {
        setEvaluations(prev => [...prev, {
            id: item.id,
            subject: item.subject,
            teacher: item.teacher,
            classroom: item.classroom,
            data: {...item.start},
            text: item.text || ""
        }]);
    };

    const deleteEvaluation = (id) => {
        setEvaluations(prev => prev.filter(v => v.id !== id));
    };

    return (
        <EvaluationsContext.Provider
            value={{
                evaluations,
                addEvaluation,
                deleteEvaluation
            }}
        >
            {children}
        </EvaluationsContext.Provider>
    );
};
