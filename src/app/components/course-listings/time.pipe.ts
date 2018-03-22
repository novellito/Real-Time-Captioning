import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'standardTime'
})
export class TimePipe implements PipeTransform {
    transform(value: any) {

        value = value.substring(0, value.indexOf('h')); // remove trailing h

        const hours = Number(value.substring(0, 2));
        let standardTime;

        if (hours > 0 && hours <= 12) {
            standardTime = '' + hours + ':';
        } else if (hours > 12) {
            standardTime = '' + (hours - 12)  + ':';
        }else if (hours === 0) {
            standardTime = '12';
        }
        standardTime += value.substring(2, 4);
        standardTime += (hours >= 12) ? ' PM' : ' AM';

        return standardTime;
    }
}