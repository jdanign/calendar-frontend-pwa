import axios from 'axios';
import { getEnvVariables } from '../helpers';


/** Obtiene las variables de entorno necesarias. */
const {VITE_API_URL} = getEnvVariables();


/** Configuración de axios */
const calendarApi = axios.create({
    baseURL: VITE_API_URL
});


/** 
 * Configuración de interceptor en la request.
 * Cualquier petición que se haga, coloca en los headers 
 * el x-token almacenado en el localstorage.
 */
calendarApi.interceptors.request.use(config =>{
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
});


export default calendarApi;