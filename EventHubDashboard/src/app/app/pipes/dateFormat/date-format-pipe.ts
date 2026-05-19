import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | null | undefined, ...args: unknown[]): string {
    let data = value;
    if (value == null || value === '') {
      data = new Date().toISOString().substring(0, 10);
    }
    return data!.split('-').reverse().join('/');
  }
}
