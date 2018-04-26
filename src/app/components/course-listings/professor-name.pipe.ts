import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'fullname'
})
export class ProfessorNamePipe implements PipeTransform {
    transform(value: any) {
        value = value.substring(0, value.indexOf('@')).replace(/[^a-z]+/g, ' '); // remove extra characters
        return value.replace(/\w\S*/g, val => val.charAt(0).toUpperCase() + val.substr(1).toLowerCase()); // Capitalize First & Last name);
    }
}