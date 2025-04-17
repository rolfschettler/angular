
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datetime' })


//Folgendes Beispiel dient nur zur Demo (Es existiert bereits ein pipe "date" in Angular)
export class DateTimePipe implements PipeTransform {
  transform(datestring: string, dateformat: string = '') {

    let x = '';
    let uhr = '';

    let dd = '';
    let mm = ''
    let yy = ''
    let yyyy = ''

    let hh = '';
    let nn = '';
    uhr = ' Uhr'
    let date = new Date(datestring);
    dd = '' + date.getDate();
    mm = '' + date.getMonth() + 1;
    yyyy = '' + date.getFullYear();
    yy = '' + date.getFullYear();

    hh = '' + date.getHours();
    nn = '' + date.getMinutes();
    if (dateformat == 'time')
      x = hh + ':' + nn + ' Uhr';
    else
      x = dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + nn;
    return x;
  }
}

