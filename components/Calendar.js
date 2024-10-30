import React, {useCallback} from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';
import {View, Text} from 'react-native';
import {PackedEvent} from "@howljs/calendar-kit";
const Calendar = ({ darkThemeEnabled }) => {

    const renderEvent = useCallback(
        (event: PackedEvent) => (
            <View
                style={{
                    width: '100%',
                    left: '10%',
                    height: '100%',
                    padding: 4,
                    backgroundColor: '#353232',
                }}>
                <Text style={{ color: 'white', fontSize: 10 }}>{event.title}{"\n"}{event.start.dateTime.slice(11,16)} - {event.end.dateTime.slice(11,16)}</Text>
            </View>
        ),
        []
    );

    const darkTheme = {
        colors: {
            primary: '#3498db',
            background: '#121212',
            onBackground: '#e0e0e0',
            text: '#e0e0e0',
        },
        dayName: {
            color: '#8c8c8c',
        },
        eventContainerStyle: {
            borderRadius: 5,
        }
    };

    const lightTheme = {
        colors: {
            primary: '#3498db',
            background: 'white',
            onBackground: '#333333',
            text: '#333333',
        },
        dayName: {
            color: '#666666',
        },
        eventContainerStyle: {
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        }
    };

    const color1 = '#82ba2e'
    const color2 = '#6089d6'

    const events = [
        // Monday
        { id: '0', title: 'Kra m320\n201', start: { dateTime: '2024-11-04T08:20:00' }, end: { dateTime: '2024-11-04T09:50:00' }, color: color1 },
        { id: '1', title: 'BeA - ef\nP1', start: { dateTime: '2024-11-04T10:05:00' }, end: { dateTime: '2024-11-04T11:35:00' }, color: color2 },
        { id: '2', title: 'Kra m320\n203', start: { dateTime: '2024-11-04T12:20:00' }, end: { dateTime: '2024-11-04T13:50:00' }, color: color1 },
        { id: '3', title: 'Kra m322\n203', start: { dateTime: '2024-11-04T13:50:00' }, end: { dateTime: '2024-11-04T14:35:00' }, color: color1 },
        { id: '4', title: 'Kra m322\n203', start: { dateTime: '2024-11-04T14:45:00' }, end: { dateTime: '2024-11-04T16:15:00' }, color: color1 },

        // Tuesday
        { id: '5', title: 'Deb m165\n203', start: { dateTime: '2024-11-05T08:20:00' }, end: { dateTime: '2024-11-05T09:50:00' }, color: color1 },
        { id: '6', title: 'Deb m165\n203', start: { dateTime: '2024-11-05T10:05:00' }, end: { dateTime: '2024-11-05T10:50:00' }, color: color1 },
        { id: '7', title: 'WaA CG\n203', start: { dateTime: '2024-11-05T10:50:00' }, end: { dateTime: '2024-11-05T12:20:00' }, color: color2 },
        { id: '8', title: 'WaA CG\n203', start: { dateTime: '2024-11-05T13:05:00' }, end: { dateTime: '2024-11-05T14:35:00' }, color: color2 },
        { id: '9', title: 'WaA CG\n203', start: { dateTime: '2024-11-05T14:45:00' }, end: { dateTime: '2024-11-05T16:15:00' }, color: color2 },

        // Wednesday
        { id: '10', title: 'WaA CG\n107', start: { dateTime: '2024-11-06T08:20:00' }, end: { dateTime: '2024-11-06T09:50:00' }, color: color2 },
        { id: '11', title: 'Pro ing\n016', start: { dateTime: '2024-11-06T10:05:00' }, end: { dateTime: '2024-11-06T11:35:00' }, color: color2 },
        { id: '12', title: 'GeG m426\n203', start: { dateTime: '2024-11-06T12:20:00' }, end: { dateTime: '2024-11-06T13:05:00' }, color: color1 },
        { id: '13', title: 'GeG m293\n203', start: { dateTime: '2024-11-06T13:05:00' }, end: { dateTime: '2024-11-06T14:35:00' }, color: color1 },
        { id: '14', title: 'Kra m322\n203', start: { dateTime: '2024-11-06T14:45:00' }, end: { dateTime: '2024-11-06T16:15:00' }, color: color1 },

        // Thursday
        { id: '15', title: 'Deb m165\n203', start: { dateTime: '2024-11-07T08:20:00' }, end: { dateTime: '2024-11-07T09:05:00' }, color: color1 },
        { id: '16', title: 'GeG m426\n203', start: { dateTime: '2024-11-07T09:05:00' }, end: { dateTime: '2024-11-07T09:50:00' }, color: color1 },
        { id: '17', title: 'GeG m426\n203', start: { dateTime: '2024-11-07T10:05:00' }, end: { dateTime: '2024-11-07T12:20:00' }, color: color1 },
        { id: '18', title: 'WaA CG\n111', start: { dateTime: '2024-11-07T13:05:00' }, end: { dateTime: '2024-11-07T14:35:00' }, color: color2 },
        { id: '19', title: 'Pro ing\n111', start: { dateTime: '2024-11-07T14:45:00' }, end: { dateTime: '2024-11-07T16:15:00' }, color: color2 },

        // Friday
        { id: '20', title: 'Kra m320\n201', start: { dateTime: '2024-11-08T08:20:00' }, end: { dateTime: '2024-11-08T09:50:00' }, color: color1 },
        { id: '21', title: 'Kra m320\n201', start: { dateTime: '2024-11-08T10:05:00' }, end: { dateTime: '2024-11-08T11:35:00' }, color: color1 },
        { id: '23', title: 'BeA ef\nP1', start: { dateTime: '2024-11-08T12:20:00' }, end: { dateTime: '2024-11-08T13:50:00' }, color: color2 },
        { id: '24', title: 'GeG m293\n203', start: { dateTime: '2024-11-08T13:50:00' }, end: { dateTime: '2024-11-08T14:35:00' }, color: color1 },
        { id: '25', title: 'GeG m293\n203', start: { dateTime: '2024-11-08T14:45:00' }, end: { dateTime: '2024-11-08T16:15:00' }, color: color1 },
    ];

    return (
        <CalendarContainer
            allowPinchToZoom={true}
            theme={darkThemeEnabled ? darkTheme : lightTheme}
            numberOfDays={5}
            hideWeekDays={[6, 7]}
            minDate="2024-09-02"
            maxDate="2025-06-16"
            events={events}
            scrollByDay={false}
            onPressEvent={(event) => { console.log('Event pressed:', event); }}
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
