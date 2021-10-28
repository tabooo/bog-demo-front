import {LazyLoadEvent} from 'primeng/api';

export const LOCALE_CODE = 'ka-GE';

export function getPage($event: LazyLoadEvent): number {
    let pageNumber = 0;

    if ($event.first !== 0) {
        pageNumber = $event.first / $event.rows;
    }

    return pageNumber;
}

export function checkIfObject(obj) {

    if (typeof obj === 'object') {
        return obj;
    }

    return null;
}

export function checkIfObjectHasId(obj) {
    if (checkIfObject(obj)) {
        if (obj.hasOwnProperty('id')) {
            return true;
        }
    }

    return false;
}

export function isObjectEmpty(object) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

export function isEmptyString(value, allowEmptyString?) {
    return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false);
}

export function roundDecimal(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function setObjectFieldsNullIfEmpty(obj) {
    if (!isObjectEmpty(obj)) {
        Object.keys(obj).forEach(key => {
            if (obj[key] && typeof obj[key] === 'object') {
                setObjectFieldsNullIfEmpty(obj[key]);
            } else if (isEmptyString(obj[key])) {
                obj[key] = null;
            }
        });
    }
}

export function removeEmptyProperties(obj) {
    if (!isObjectEmpty(obj)) {
        Object.keys(obj).forEach(key => {

            if (obj[key] && typeof obj[key] === 'object') {
                removeEmptyProperties(obj[key]);
            } else if (obj[key] == null) {
                delete obj[key];
            }

            if (typeof obj[key] === 'object' && isObjectEmpty(obj[key])) {
                delete obj[key];
            }
        });
    }
}

export function getLibFromLibsById(libId, libs) {
    let tmp = null;
    libs.forEach(lib => {
        if (lib.id === Number(libId)) {
            tmp = lib;
        }
    });

    return tmp;
}
