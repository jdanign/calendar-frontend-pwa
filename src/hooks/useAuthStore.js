import { useDispatch, useSelector } from "react-redux";
import {calendarApi} from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";



export const useAuthStore = () => {
    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogout = (msg='')=>{
        localStorage.clear();
        dispatch(onLogoutCalendar(msg));
        dispatch(onLogout(msg));
    }


    const startLogin = async ({email, password})=>{
        dispatch(onChecking());
        try {
            const {data} = await calendarApi.post('/auth', {email, password});
            const {token, name, uid} = data;

            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name, uid}));

        } catch (error) {
            console.error(error);
            startLogout('Credenciales incorrectas');
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 100);
        }
    }


    const startRegister = async ({email, name, password})=>{
        dispatch(onChecking());
        try {
            const {data} = await calendarApi.post('/auth/new', {email, name, password});
            const {token, uid} = data;

            localStorage.setItem('token', token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name, uid}));

        } catch (error) {
            console.error(error);
            startLogout(error.response.data?.msg || 'Error en el registro');
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 100);
        }
    }


    const checkAuthToken = async()=>{
        const token = localStorage.getItem('token');
        if (token){
            try {
                const {data} = await calendarApi.get('auth/renew');
                const {token, uid, name} = data;

                localStorage.setItem('token', token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(onLogin({name, uid}));

            } catch (error) {
                startLogout()
            }
        }  
        else
            startLogout();
    }


    return {
        //* Propiedades
        status, user, errorMessage,

        //* Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}
