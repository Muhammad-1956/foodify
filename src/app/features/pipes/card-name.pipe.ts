import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name: 'cardholderName',
standalone: true,
})
export class CardholderNamePipe implements PipeTransform {
transform(value: string | null | undefined): string {
if (!value) return 'Cardholder Name';


// Keep letters A-Z or a-z and spaces
const lettersOnly = value.replace(/[^A-Za-z ]/g, '').trim();

return lettersOnly || 'Cardholder Name';

}
}
