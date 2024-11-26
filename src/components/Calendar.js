import React, {useCallback, useMemo} from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import {View, Text, StyleSheet} from 'react-native';
import {PackedEvent} from "@howljs/calendar-kit";
import {EVENTS} from "../constants/events";
import {CALENDAR_CONFIG} from "../constants/const";
import {LocaleConfigsProps} from "@howljs/calendar-kit";
import {darkColors} from "../theme/colors/dark";
import {lightColors} from "../theme/colors/light";
// Main Calendar component that accepts darkThemeEnabled and onEventPress as props
const Calendar = ({ darkThemeEnabled, onEventPress }) => {
    // Initialize styles using custom hook based on theme
    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);

    const colors = useMemo(() =>
            darkThemeEnabled ? darkColors : lightColors,
        [darkThemeEnabled]
    );

    const initialLocales: Record<string, Partial<LocaleConfigsProps>> = {
        en: {
            weekDayShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'), // Text in day header (Sun, Mon, etc.)
            meridiem: { ante: 'am', post: 'pm' }, // Hour format (hh:mm a)
            more: 'more', // Text for "more" button (All day events)
        },
        it: {
            weekDayShort: 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'), // Text in day header (Sun, Mon, etc.)
            meridiem: { ante: 'am', post: 'pm' }, // Hour format (hh:mm a)
            more: 'di più', // Text for "more" button (All day events)
        },

    };
    // Callback function to render individual calendar events
    // Takes a PackedEvent type parameter and returns a styled View
    const renderEvent = useCallback((event: PackedEvent) => (
            <View style={styles.eventContainer}>
                <Text style={styles.eventText}>
                    {/* Display event title and formatted time range */}
                    {event.title}{"\n"}
                    {event.start.dateTime.slice(11,16)} - {event.end.dateTime.slice(11,16)}
                </Text>
            </View>
        ),
        [styles]
    );
    // Return the calendar component structure
    return (
        <CalendarContainer
            allowPinchToZoom={true}  // Enable pinch zoom functionality
            theme={colors}           // Apply theme colors
            events={EVENTS}          // Pass events data
            scrollByDay={false}      // Disable scroll by day
            onPressEvent={onEventPress} // Handle event press
            useHaptic={true}         // Enable haptic feedback
            {...CALENDAR_CONFIG}      // Spread additional calendar configuration
            initialLocales={initialLocales}
            locale='it'
        >
            <CalendarHeader />
            <CalendarBody renderEvent={renderEvent} />
        </CalendarContainer>
    );
};

export default Calendar;

const createStyles = (darkThemeEnabled) => StyleSheet.create({
    eventContainer: {
        width: '100%',
        left: '10%',
        height: '100%',
        padding: 4,
        backgroundColor: darkThemeEnabled ? '#2e2e2e' : 'rgba(46,46,46,0.4)',
    },
    eventText: {
        color: darkThemeEnabled ? 'white' : 'black',
        fontSize: 10
    }
});
