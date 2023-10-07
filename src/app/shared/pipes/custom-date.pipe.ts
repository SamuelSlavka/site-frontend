import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    const d = new Date(value);
    d.setHours(d.getHours() + 2);
    return (
      d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear() + ', at ' + d.getHours() + ':' + d.getMinutes()
    );
  }
}