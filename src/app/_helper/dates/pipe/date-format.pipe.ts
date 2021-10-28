import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {DATE_FORMAT, TIME_ZONE} from '../date-util';
import {LOCALE_CODE} from '../../utils';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return super.transform(value, DATE_FORMAT, TIME_ZONE, LOCALE_CODE);
  }

}
