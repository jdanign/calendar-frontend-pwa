import { dateFnsLocalizer } from 'react-big-calendar';

import { format, parse, startOfWeek, getDay } from 'date-fns';
import esES from 'date-fns/locale/es';


const locales = {
    'es': esES,
};


/** Configuración local de dateFNS. */
export const localizer = dateFnsLocalizer({
    locales,
    format,
    parse,
    startOfWeek,
    getDay,
});