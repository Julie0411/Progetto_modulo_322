import React, { useCallback, useContext, useMemo } from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import { StyleSheet, Text, View } from 'react-native';
import { EVENTS } from "../constants/events";
import { darkColors } from "../theme/colors/dark";
import { lightColors } from "../theme/colors/light";
import { ThemeContext } from "../context/ThemeContext";
import { ClassContext } from "../context/ClassContext";
import { getWeek } from 'date-fns';

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

    const renderWeekDay = ({ day }) => {
        const dateObj = new Date(day.date);
        const weekDay = day.label;
        const dayNum = dateObj.getDate();
        const monthNum = dateObj.getMonth() + 1;

        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{weekDay}</Text>
                <Text>{dayNum}.{monthNum}</Text>
            </View>
        );
    };

    const currentWeekNumber = getWeek(new Date());

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                position: 'absolute',
                top: 10,
                left: 10,
                zIndex: 10,
                backgroundColor: 'white',
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 4,
                alignItems: 'center',
            }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>Settimana</Text>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>{currentWeekNumber}</Text>
            </View>

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
                showWeekNumber={false}
            >
                <CalendarHeader renderHeaderWeekDay={renderWeekDay} />
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
        width: '95%',
    }
});
