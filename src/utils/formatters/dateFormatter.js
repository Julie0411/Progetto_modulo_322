// Function to format a date string into Italian format with capitalized month
export const formatDate = (dateString) => {
    // Create new Date object from input string
    const date = new Date(dateString);

    // Format date using Italian locale with numeric day and full month name
    const formattedDate = new Intl.DateTimeFormat('it-IT', {
        day: 'numeric',
        month: 'long'
    }).format(date);

    // Manipulate string to capitalize first letter of month:
    // - Take first 2 chars (day)
    // - Capitalize 3rd char (first letter of month)
    // - Add rest of string (remaining month letters)
    return formattedDate.slice(0, 2) + formattedDate.charAt(2).toUpperCase() + formattedDate.slice(3);
};

// Function to extract time from a datetime string
export const formatEventTime = (dateTime) => {
    // Extract hours and minutes (positions 11-16) from datetime string
    // Example: "2023-12-31T14:30:00" -> "14:30"
    return dateTime.slice(11, 16);
};

// Export both functions as default object
export default {
    formatDate,
    formatEventTime,
};
