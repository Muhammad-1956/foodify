import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber',
  standalone: true,
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '•••• •••• •••• ••••';

    // Extract digits only
    const digits = value.replace(/\D/g, '');
    if (!digits) return '•••• •••• •••• ••••';

    // Format every 4 digits
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }
}
