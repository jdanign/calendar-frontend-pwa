import { createSlice } from '@reduxjs/toolkit';

import { addHours } from 'date-fns';




/* const tempEvent = {
    id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date, 2),
    bgColor: '#fafafa',
    user: {
        id: '123',
        name: 'Dani'
    }
} */

const initialState = {
    isLoadingEvents: true,
    events: [
        /* tempEvent */
    ],
    activeEvent: null,
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onCleanActiveEvent: (state)=>{
            state.activeEvent = {
                title: '',
                notes: '',
                start: new Date(),
                end: addHours(new Date, 2),
                bgColor: '#fafafa',
                user: {
                    id: '123',
                    name: 'Dani'
                }
            }
        },
        onAddNewEvent: (state, {payload})=>{
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, {payload})=>{
            state.events = state.events.map(event => 
                (event.id === payload.id) ? payload : event);
        },
        onDeleteEvent: (state)=>{
            if (state.activeEvent){
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, {payload=[]})=>{
            state.isLoadingEvents = false;
            //state.events = payload;
            payload.forEach(event => {
                // Obtiene true si el evento obtenido existe en el estado
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                // Si el evento no existe, lo añade al estado
                if (!exists)
                    state.events.push(event);
            });
        },
        onLogoutCalendar: (state)=>{
            state.isLoadingEvents = initialState.isLoadingEvents;
            state.events = initialState.events;
            state.activeEvent = initialState.activeEvent;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onCleanActiveEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent, 
    onUpdateEvent,
} = calendarSlice.actions;