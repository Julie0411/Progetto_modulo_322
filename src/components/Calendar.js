import React, {useCallback, useMemo} from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import {View, Text, StyleSheet} from 'react-native';
import {PackedEvent} from "@howljs/calendar-kit";
import {darkColors} from "../theme/colors/dark";
import {lightColors} from "../theme/colors/light";
import {EVENTS} from "../constants/events";
import {useStyles} from "../utils/hooks/useStyles";
import {CALENDAR_CONFIG} from "../constants/const";

const Calendar = ({ darkThemeEnabled, onEventPress }) => {
    const styles = useStyles(createStyles, darkThemeEnabled);
    const colors = useMemo(() =>
            darkThemeEnabled ? darkColors : lightColors,
        [darkThemeEnabled]
    );
    const renderEvent = useCallback((event: PackedEvent) => (
            <View style={styles.eventContainer}>
                <Text style={styles.eventText}>{event.title}{"\n"}{event.start.dateTime.slice(11,16)} - {event.end.dateTime.slice(11,16)}</Text>
            </View>
        ),
        [styles]
    );
    return (
        <CalendarContainer
            allowPinchToZoom={true}
            theme={colors}
            events={EVENTS}
            scrollByDay={false}
            onPressEvent={onEventPress}
            useHaptic={true}
            {...CALENDAR_CONFIG}
        >
            <CalendarHeader />
            <CalendarBody renderEvent={renderEvent} />
        </CalendarContainer>
    );
};

export default Calendar;

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
