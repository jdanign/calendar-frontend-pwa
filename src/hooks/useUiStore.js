import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";




export const useUiStore = ()=>{
    const dispatch = useDispatch();

    const {
        isDateModalOpen,
    } = useSelector(state => state.ui);


    const toggleDateModal = (show=null)=>{
        typeof show === 'undefined' ? 
            (isDateModalOpen ? dispatch(onCloseDateModal()) : dispatch(onOpenDateModal()))
            :
            (show === true ? dispatch(onOpenDateModal()) : (show === false && dispatch(onCloseDateModal())))
    }


    return {
        //*Propiedades
        isDateModalOpen,

        //* Métodos
        toggleDateModal,
    }
}