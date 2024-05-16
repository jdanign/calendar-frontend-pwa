import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = ()=>{
    const {toggleDateModal} = useUiStore();
    const {cleanActiveEvent} = useCalendarStore();


    const handleClickNew = ()=>{
        cleanActiveEvent();
        toggleDateModal(true);
    }


    return (
        <button
            onClick={handleClickNew}
            className='btn btn-primary fab'
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}