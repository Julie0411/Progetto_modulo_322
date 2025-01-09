import { useState } from 'react';

export const useVerifications = () => {
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

    return { verifications, addVerification, deleteVerification };
};
