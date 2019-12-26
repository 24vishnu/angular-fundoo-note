import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pinNote'
})
export class PinNotePipe implements PipeTransform {

  transform(notes: any, pin: boolean): any {
    if (notes == null) {
    return null;
    }
    return notes.filter(note => note.is_pin === pin);
    }

}
