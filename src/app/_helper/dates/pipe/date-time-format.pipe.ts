import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DATE_TIME_FORMAT, TIME_ZONE} from '../date-util';
import {LOCALE_CODE} from '../../utils';

@Pipe({
    name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        return super.transform(value, DATE_TIME_FORMAT, TIME_ZONE, LOCALE_CODE);
    }

}
