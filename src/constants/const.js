// Calendar configuration settings
export const CALENDAR_CONFIG = {
    timeInterval: 25,        // Duration of each time slot in minutes
    start: 500,             // Start time (5:00 AM in 24h format)
    end: 990,              // End time (10:00 AM in 24h format)
    minDate: "2024-09-02",  // Minimum selectable date
    maxDate: "2025-06-16",  // Maximum selectable date
    numberOfDays: 5,        // Number of days to display in the calendar view
    hideWeekDays: [6, 7]    // Hide Saturday (6) and Sunday (7) from the calendar
};
// Initial dropdown/select configuration settings
export const INITIAL_CONFIG = {
    labelField: "label",           // Field name for display text in options
    valueField: "value",           // Field name for option values
    placeholder: 'Scegli la sua classe',      // Default placeholder text (Italian: "Click here")
    searchPlaceholder: "Ricerca…", // Placeholder text for search input
};
// Classes options for dropdown select
export const CLASSES_OPTIONS = [
    { label: 'I2a', value: '1' },
    { label: 'I2b', value: '2' },
    { label: 'I2c', value: '3' },
];
