import React, { createContext, useState } from 'react';

export const ClassContext = createContext();

export const ClassSettingsProvider = ({ children }) => {
    const [selectedClass, setSelectedClass] = useState();
    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);

    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);

    return (
        <ClassContext.Provider
            value={{
                selectedClass,
                setSelectedClass,
                maturityIsEnabled,
                setMaturityIsEnabled,
                toggleMaturity
            }}
        >
            {children}
        </ClassContext.Provider>
    );
};
