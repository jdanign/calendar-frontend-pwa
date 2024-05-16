import { useCalendarStore } from "../../hooks";


export const FabDelete = ()=>{
    const {
        hasEventSelected, 
        startDeletingEvent
    } = useCalendarStore();


    const handleClickDelete = async ()=>{
        await startDeletingEvent();
    }


    return (
        <button
            onClick={handleClickDelete}
            className='btn btn-danger fab-del'
            style={{
                display: hasEventSelected ? '': 'none',
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}