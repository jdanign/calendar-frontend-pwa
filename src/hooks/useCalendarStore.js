import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onCleanActiveEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../calendar/helpers";
import Swal from "sweetalert2";




export const useCalendarStore = ()=>{
    const dispatch = useDispatch();

    const {
        events,
        activeEvent,
    } = useSelector(state => state.calendar);

    const {
        user,
    } = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }


    const cleanActiveEvent = ()=>{
        dispatch(onCleanActiveEvent());
    }
    
    
    const startSavingEvent = async (calendarEvent)=>{
        try {
            // Actualiza
            if (calendarEvent.id){
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
            }
            // Inserta
            else{
                /** 
                 * Usa la API creada con AXIOS para enviar la petición usando la URL 
                 * de las variables de entorno, añadiéndole la cadena especificada con 
                 * los parámetros del segundo parámetro de la función.
                 */
                const {data} = await calendarApi.post('/events', calendarEvent);

                dispatch(onAddNewEvent({
                    ...calendarEvent, 
                    id: data.evento.id,
                    user
                }))
            }
        } catch (error) {
            console.error('Error al guardar evento');
            console.error(error);
            Swal.fire('Error al guardar', error?.response?.data?.msg ?? '', 'error');
        }
    }


    const startDeletingEvent = async ()=>{
        try {
            await calendarApi.delete(`/events/${activeEvent?.id}`);
            dispatch(onDeleteEvent());

        } catch (error) {
            console.error('Error al eliminar evento');
            console.error(error);
            Swal.fire('Error al eliminar', error?.response?.data?.msg ?? '', 'error');
        }
    }


    const startLoadingEvents = async ()=>{
        try {
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDate(data.eventos);
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.error('Error al cargar eventos');
            console.error(error);
        }
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
        startLoadingEvents,
    }
}