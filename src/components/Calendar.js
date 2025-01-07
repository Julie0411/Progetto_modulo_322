import React, {useCallback, useMemo} from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import {View, Text, StyleSheet} from 'react-native';
import {EVENTS} from "../constants/events";
import {CALENDAR_CONFIG} from "../constants/const";
import {darkColors} from "../theme/colors/dark";
import {lightColors} from "../theme/colors/light";
// Main Calendar component that accepts darkThemeEnabled and onLongPressEvent as props
const Calendar = ({ darkThemeEnabled, onPressEvent, onLongPressEvent, selectedClass }) => {
    // Initialize styles using custom hook based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);
    // Determine colors based on theme
    const colors = useMemo(() => darkThemeEnabled ? darkColors : lightColors, [darkThemeEnabled]);
    // Locale configuration for the calendar
    const initialLocales = {
        it: {
            weekDayShort: 'Dom_Lun_Mar_Mer_Gio_Ven'.split('_'), // Text in day header (Sun, Mon, etc.)
            meridiem: { ante: 'am', post: 'pm' }, // Hour format (hh:mm a)
        },
    };
    // Callback function to render individual calendar events
    // Takes a PackedEvent type parameter and returns a styled View
    const renderEvent = useCallback((event) => (
            <View style={styles.eventContainer}>
                <Text style={styles.eventText}>
                    {event.title}{"\n"}
                    {event.classroom?.startsWith('P') ? 'Palestra' : 'Aula'} {event.classroom}{"\n"}
                    {event.start.dateTime.slice(11,16)} - {event.end.dateTime.slice(11,16)}
                </Text>
            </View>
        ),
        [styles]
    );
    const filteredEvents = useMemo(() => {
        if (!selectedClass?.label) return [];
        const standardClass = selectedClass.label;
        const maturityClass = `M${selectedClass.label.slice(0, -1)}`;
        return EVENTS.filter(event => {
            // If maturity is enabled for the class
            if (selectedClass.maturityIsEnabled) {
                return event.maturity && (event.class === standardClass || event.class === maturityClass);
            }
            // If maturity is not enabled, show only events for the selected class
            return event.class === standardClass;
        });
    }, [selectedClass?.label, selectedClass?.maturityIsEnabled]);

    return (
        <CalendarContainer
            allowPinchToZoom={true}  // Enable pinch zoom functionality
            theme={colors}           // Apply theme colors
            events={filteredEvents}          // Pass events data
            scrollByDay={false}      // Disable scroll by day
            onPressEvent={onPressEvent}
            onLongPressEvent={onLongPressEvent} // Handle event press
            {...CALENDAR_CONFIG}      // Spread additional calendar configuration
            initialLocales={initialLocales} // Set localizations
            locale='it' // Set localization as Italian
            minRegularEventMinutes={30} // Minimum event duration
            minTimeIntervalHeight={40} // Minimum height for regular events
            maxTimeIntervalHeight={60} // Maximum height for regular events
        >
            <CalendarHeader />
            <CalendarBody renderEvent={renderEvent} />
        </CalendarContainer>
    );
};

export default Calendar;

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    eventContainer: {
        width: '95%',
        left: '10%',
        height: '100%',
        padding: 4,
        backgroundColor: darkThemeEnabled ? '#2e2e2e' : 'rgba(46,46,46,0.1)',
    },
    eventText: {
        color: 'white',
        fontSize: 10,
        width: '95%'
    }
});
