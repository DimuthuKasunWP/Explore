import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 'dateFormatPipe'})
export class DateFormatPipe implements PipeTransform {
  transform(value: string, type?: string) {
    const datePipe = new DatePipe('en-US');
    if (!type) {
      value = datePipe.transform(value, 'd MMM yyy');
    }
    if (type === 'long') {
      value = datePipe.transform(value, 'h:mm a - d MMM yyy');
    }
    if (type === 'month') {
      value = datePipe.transform(value, 'MMM yyy');
    }
    if (type == 'date-picker-month') {
      value = datePipe.transform(value, 'M');
    }
    if (type == 'date-picker-day') {
      value = datePipe.transform(value, 'd');
    }
    if (type == 'date-picker-year') {
      value = datePipe.transform(value, 'yyy');
    }
    if (type == 'date-picker-full') {
      value = datePipe.transform(value, 'M/d/yyy');
    }
    return value;
  }
}
