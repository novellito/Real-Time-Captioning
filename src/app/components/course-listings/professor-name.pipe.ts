import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'fullname'
})
export class ProfessorNamePipe implements PipeTransform {
    transform(value: any) {

        return value.substring(0, value.indexOf('@')).replace(/[^a-z]+/g, ' ');
    }
}