import { useEffect, useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';




export const CalendarPage = () => {
    const {user} = useAuthStore();
    const {toggleDateModal} = useUiStore();
    const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected)=>{
        /** Comprueba si el evento peretenece al usuario que está logueado */
        const isMyEvent = (user.uid === (event.user?._id ?? event.user.uid));

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
            borderRadius: '0',
            opacity: 0.8,
            color: 'white'
        }
        return {style}
    }
    

    /** Doble clic sobre el evento del calendario. */
    const onDoubleClick = ()=>{
        toggleDateModal(true);
    }


    /** Un clic sobre el evento del calendario. */
    const onSelect = (event)=>{
        setActiveEvent(event);
    }


    /** Cambia la vista del calendario (mes, semana, dia, agenda...) */
    const onViewChanged = (event)=>{
        localStorage.setItem('lastView', event);
        setLastView(event);
    }


    useEffect(() => {
        startLoadingEvents();
    }, []);
    


    return (
        <>
			<Navbar />

            <Calendar
                localizer={localizer}
                culture='es'
                messages={getMessagesES()}
                startAccessor='start'
                endAccessor='end'
                defaultView={lastView}
                style={{height: 'calc(100vh - 80px)'}}
                events={events}
                eventPropGetter={eventStyleGetter}
                components={{event: CalendarEvent}}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />

            <FabAddNew />
            <FabDelete />
		</>
    )
}