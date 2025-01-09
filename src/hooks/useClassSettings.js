import { useState } from 'react';

export const useClassSettings = () => {
    const [selectedClass, setSelectedClass] = useState({label: "I2a", maturityIsEnabled: true});
    const [maturityIsEnabled, setMaturityIsEnabled] = useState(false);

    const toggleMaturity = () => setMaturityIsEnabled(!maturityIsEnabled);

    return {
        selectedClass,
        setSelectedClass,
        maturityIsEnabled,
        setMaturityIsEnabled,
        toggleMaturity
    };
};
