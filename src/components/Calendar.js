import React, {useCallback} from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import {View, Text, StyleSheet} from 'react-native';
import {PackedEvent} from "@howljs/calendar-kit";
import {darkColors} from "../theme/colors/dark";
import {lightColors} from "../theme/colors/light";
import {EVENTS} from "../constants/events";
import {useStyles} from "../utils/hooks/useStyles";

const createStyles = (colors) => StyleSheet.create({
    eventContainer: {
        width: '100%',
        left: '10%',
        height: '100%',
        padding: 4,
        backgroundColor: colors.surface,
    },
    eventText: {
        color: colors.text,
        fontSize: 10
    }
});

const Calendar = ({ darkThemeEnabled, onEventPress }) => {
    const styles = useStyles(createStyles, darkThemeEnabled);
    const renderEvent = useCallback((event: PackedEvent) => (
            <View style={styles.eventContainer}>
                <Text style={styles.eventText}>{event.title}{"\n"}{event.start.dateTime.slice(11,16)} - {event.end.dateTime.slice(11,16)}</Text>
            </View>
        ),
        []
    );
    const colors = darkThemeEnabled ? darkColors : lightColors;

    return (
        <CalendarContainer
            allowPinchToZoom={true}
            theme={colors}
            numberOfDays={5}
            hideWeekDays={[6, 7]}
            minDate="2024-09-02"
            maxDate="2025-06-16"
            events={EVENTS}
            scrollByDay={false}
            onPressEvent={onEventPress}
            timeInterval={45}
            start={500}
            end={1000}
            useHaptic={true}
        >
            <CalendarHeader />
            <CalendarBody renderEvent={renderEvent} />
        </CalendarContainer>
    );
};

export default Calendar;
