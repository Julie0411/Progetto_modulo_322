import React, { useCallback, useContext, useMemo } from 'react';
import { CalendarBody, CalendarContainer } from '@howljs/calendar-kit';
import { StyleSheet, Text, View } from 'react-native';
import { EVENTS } from "../constants/events";
import { darkColors } from "../theme/colors/dark";
import { lightColors } from "../theme/colors/light";
import { ThemeContext } from "../context/ThemeContext";
import { ClassContext } from "../context/ClassContext";

const Calendar = ({ onPressEvent, onLongPressEvent, onDateChanged }) => {
    const { darkThemeEnabled } = useContext(ThemeContext);
    const { selectedClass } = useContext(ClassContext);

    const styles = useMemo(() => createStyles(darkThemeEnabled), [darkThemeEnabled]);
    const colors = useMemo(() => darkThemeEnabled ? darkColors : lightColors, [darkThemeEnabled]);

    const initialLocales = {
        it: {
            weekDayShort: 'Dom_Lun_Mar_Mer_Gio_Ven'.split('_'),
            meridiem: { ante: 'am', post: 'pm' },
        },
    };

    const renderEvent = useCallback((event) => (
        <View style={styles.eventContainer}>
            <Text style={styles.eventText}>
                {event.title}{"\n"}
                {event.classroom?.startsWith('P') ? 'Palestra' : 'Aula'} {event.classroom}{"\n"}
                {event.start.dateTime.slice(11, 16)} - {event.end.dateTime.slice(11, 16)}
            </Text>
        </View>
    ), [styles]);

    const filteredEvents = useMemo(() => {
        if (!selectedClass?.label) return [];
        const standardClass = selectedClass.label;
        const maturityClass = `M${selectedClass.label.slice(0, -1)}`;
        return EVENTS.filter(event => {
            if (selectedClass.maturityIsEnabled) {
                return event.maturity && (event.class === standardClass || event.class === maturityClass);
            }
            return event.class === standardClass;
        });
    }, [selectedClass?.label, selectedClass?.maturityIsEnabled]);

    return (
        <View style={{ flex: 1 }}>
            <CalendarContainer
                allowPinchToZoom={true}
                theme={colors}
                events={filteredEvents}
                scrollByDay={false}
                onPressEvent={onPressEvent}
                onLongPressEvent={onLongPressEvent}
                timeInterval={25}
                start={500}
                end={990}
                minDate={"2024-09-02"}
                maxDate={"2025-06-16"}
                numberOfDays={5}
                hideWeekDays={[6, 7]}
                initialLocales={initialLocales}
                locale='it'
                minRegularEventMinutes={30}
                minTimeIntervalHeight={40}
                maxTimeIntervalHeight={60}
                showWeekNumber={true}
                onDateChanged={onDateChanged}
            >
                <CalendarBody renderEvent={renderEvent} />
            </CalendarContainer>
        </View>
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
