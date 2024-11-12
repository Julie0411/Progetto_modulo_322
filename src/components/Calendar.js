import React, {useCallback, useMemo} from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import {View, Text, StyleSheet} from 'react-native';
import {PackedEvent} from "@howljs/calendar-kit";
import {darkColors} from "../theme/colors/dark";
import {lightColors} from "../theme/colors/light";
import {EVENTS} from "../constants/events";
import {useStyles} from "../utils/hooks/useStyles";
import {CALENDAR_CONFIG} from "../constants/const";
// Main Calendar component that accepts darkThemeEnabled and onEventPress as props
const Calendar = ({ darkThemeEnabled, onEventPress }) => {
    // Initialize styles using custom hook based on theme
    const styles = useStyles(createStyles, darkThemeEnabled);
    // Memoized color theme selection based on darkThemeEnabled prop
    const colors = useMemo(() =>
            darkThemeEnabled ? darkColors : lightColors,
        [darkThemeEnabled]
    );
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
        >
            <CalendarHeader />
            <CalendarBody renderEvent={renderEvent} />
        </CalendarContainer>
    );
};

export default Calendar;
// StyleSheet creation function that receives colors as parameter
const createStyles = (colors) => StyleSheet.create({
    eventContainer: {
        width: '100%',
        left: '10%',
        height: '100%',
        padding: 4,
        backgroundColor: colors.eventSurface,
    },
    eventText: {
        color: colors.text,
        fontSize: 10
    }
});
