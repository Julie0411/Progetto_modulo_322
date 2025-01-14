import React, { createContext, useState } from 'react';

export const VerificationsContext = createContext();

export const VerificationsProvider = ({ children }) => {
    const [verifications, setVerifications] = useState([]);

    const addVerification = (item) => {
        setVerifications(prev => [...prev, {
            id: item.id,
            subject: item.subject,
            teacher: item.teacher,
            classroom: item.classroom,
            data: {...item.start},
            text: item.text || ""
        }]);
    };

    const deleteVerification = (id) => {
        setVerifications(prev => prev.filter(v => v.id !== id));
    };

    return (
        <VerificationsContext.Provider
            value={{
                verifications,
                addVerification,
                deleteVerification
            }}
        >
            {children}
        </VerificationsContext.Provider>
    );
};
