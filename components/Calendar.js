import React from 'react';
import { CalendarBody, CalendarContainer, CalendarHeader } from '@howljs/calendar-kit';

const Calendar = ({darkThemeEnabled}) => {
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
        }
    };

    const events=[
        {
            id: '1',
            title: 'm320',
            start: { dateTime: '2024-11-04T08:20:00Z' },
            end: { dateTime: '2024-11-04T09:50:00Z' },
            color: '#4285F4',
        },
        {
            id: '2',
            title: 'EF',
            start: { dateTime: '2024-11-04T10:05:00Z' },
            end: { dateTime: '2024-11-04T11:35:00Z' },
            color: '#4285F4',
        },
        {
            id: '3',
            title: 'm320',
            start: { dateTime: '2024-11-04T12:20:00Z' },
            end: { dateTime: '2024-11-04T13:50:00Z' },
            color: '#4285F4',
        },
        {
            id: '4',
            title: 'm322',
            start: { dateTime: '2024-11-04T13:50:00Z' },
            end: { dateTime: '2024-11-04T16:15:00Z' },
            color: '#4285F4',
        },
        {
            id: '5',
            title: 'm165',
            start: { dateTime: '2024-11-05T08:20:00Z' },
            end: { dateTime: '2024-11-05T10:50:00Z' },
            color: '#4285F4',
        },
        {
            id: '6',
            title: 'CG',
            start: { dateTime: '2024-11-05T10:50:00Z' },
            end: { dateTime: '2024-11-05T12:20:00Z' },
            color: '#4285F4',
        },
        {
            id: '7',
            title: 'CG',
            start: { dateTime: '2024-11-05T13:05:00Z' },
            end: { dateTime: '2024-11-05T16:15:00Z' },
            color: '#4285F4',
        },
    ]

    return (
        <CalendarContainer theme={darkThemeEnabled ? darkTheme : lightTheme} numberOfDays={5} hideWeekDays={[6, 7]} firstDay={1} events={events}  onPressEvent={(event) => {console.log('Event pressed:', event);}}>
            <CalendarHeader />
            <CalendarBody />
        </CalendarContainer>
    );
};

export default Calendar;
