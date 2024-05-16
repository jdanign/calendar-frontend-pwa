import { createSlice } from '@reduxjs/toolkit';

import { addHours } from 'date-fns';




const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date, 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Dani'
    }
}

const initialState = {
    events: [
        tempEvent
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
                    _id: '123',
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
                (event._id === payload._id) ? payload : event);
        },
        onDeleteEvent: (state)=>{
            if (state.activeEvent){
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    onCleanActiveEvent,
    onSetActiveEvent, 
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
} = calendarSlice.actions;