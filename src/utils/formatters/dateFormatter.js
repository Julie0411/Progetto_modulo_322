export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('it-IT', {
        day: 'numeric',
        month: 'long'
    }).format(date);
    return formattedDate.slice(0, 2) +
        formattedDate.charAt(2).toUpperCase() +
        formattedDate.slice(3);
};

export const formatEventTime = (dateTime) => {
    return dateTime.slice(11, 16);
};
