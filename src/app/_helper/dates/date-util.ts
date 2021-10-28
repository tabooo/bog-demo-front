import {LOCALE_CODE} from '../utils';
import {formatDate} from '@angular/common';

export const TIME_ZONE_NUMBER = 4;

export const TIME_ZONE = 'UTC +4';

export const DATE_FORMAT = 'dd-MM-yyyy'; // 'yyyy-MM-dd';

export const DATE_TIME_FORMAT = 'dd-MM-yyyy HH:mm'; // 'yyyy-MM-dd HH:mm:ss';

export const CALENDAR_DATE_FORMAT = 'yy-mm-dd';

// TODO
export function getNewDate(date) {
    if (date) {
        return new Date(date);
    }

    return null;
}

export function setDefaultTimeToDate(date) {
    const newDateTime = new Date(date);

    newDateTime.setHours(12 + TIME_ZONE_NUMBER, 0, 0, 0); // TODO რამე უკეთესია მოსაფიქრებელი

    return newDateTime;
}

export function resetTimeToDateToISOString(date) {

    if (date) {
        const newDateTime = new Date(date);

        newDateTime.setHours(TIME_ZONE_NUMBER, 0, 0, 0); // TODO რამე უკეთესია მოსაფიქრებელი

        return newDateTime.toISOString();
    }

    return '';
}

// TODO
export function getTimestampFromDate(date) {
    return new Date(date).getTime();
}

export function getFormatDate(d, format = DATE_FORMAT) {
    return formatDate(new Date(d), format, LOCALE_CODE, TIME_ZONE);
}

export function getFormatDateTime(d, format = DATE_TIME_FORMAT) {
    return formatDate(new Date(d), format, LOCALE_CODE, TIME_ZONE);
}

export function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
}
