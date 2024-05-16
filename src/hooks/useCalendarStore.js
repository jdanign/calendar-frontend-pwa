import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onCleanActiveEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";




export const useCalendarStore = ()=>{
    const dispatch = useDispatch();

    const {
        events,
        activeEvent,
    } = useSelector(state => state.calendar);


    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }


    const cleanActiveEvent = ()=>{
        dispatch(onCleanActiveEvent());
    }
    
    
    const startSavingEvent = async (calendarEvent)=>{
        // Actualiza
        if (calendarEvent._id)
            dispatch(onUpdateEvent({...calendarEvent}));
        // Inserta
        else
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }


    const startDeletingEvent = async ()=>{
        dispatch(onDeleteEvent());
    }



    return {
        //*Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        cleanActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}