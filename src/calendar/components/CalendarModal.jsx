import { useEffect, useMemo, useState } from "react";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from "react-modal";

import {addHours, differenceInSeconds} from "date-fns";
import es from "date-fns/locale/es";
import DatePicker, {registerLocale} from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useCalendarStore, useUiStore } from "../../hooks";




registerLocale('es', es);


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


/** React appElement. */
Modal.setAppElement('#root');


export const CalendarModal = ()=>{
    const {
        isDateModalOpen, 
        toggleDateModal,
    } = useUiStore();

    const {
        activeEvent, 
        startSavingEvent,
    } = useCalendarStore();


    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Dani',
        notes: 'García',
        start: new Date(),
        end: addHours(new Date(), 2),
    })

    const {title, notes, start, end} = formValues;

    /** Almacena la clase que resalta visualmente el input inválido */
    const titleClass = useMemo(
        () => (title.length > 0 || !formSubmitted ? '' : 'is-invalid'), 
        [title, formSubmitted]
    );

    useEffect(() => {
        if (activeEvent !== null){
            setFormValues({...activeEvent});
        }

    }, [activeEvent])
    

    const onInputChange = ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }


    const onDateChanged = (event, changing)=>{
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }


    const onSubmit = async (e)=>{
        e.preventDefault();
        
        // Establece el intento de envío en el formulario
        setFormSubmitted(true);

        /**  Diferencia entre la fecha de inicio y final en segundos */
        const difference = differenceInSeconds(end, start);

        // Validación de campos
        if (isNaN(difference))
            Swal.fire('Error en las fechas');
        else if (difference <= 0)
            Swal.fire('ERROR. La fecha de finalización no puede ser mayor a la de inicio');
        else if (title.length <= 0)
            Swal.fire('ERROR. El título no es válido');
        else{
            await startSavingEvent(formValues);
            onCloseModal();
            setFormSubmitted(false);
        }
    }


    const onCloseModal = ()=>{
        console.log('cerrando modal');
        toggleDateModal(false);
    }


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form onSubmit={onSubmit} className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={start}
                        onChange={event => onDateChanged(event, 'start')}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                        className="form-control"
                        wrapperClassName="w-100"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        selected={end}
                        onChange={event => onDateChanged(event, 'end')}
                        minDate={start}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                        className="form-control"
                        wrapperClassName="w-100"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}