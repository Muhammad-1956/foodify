import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber',
  standalone: true,
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
      if (!value) return '•••• •••• •••• ••••';

  // Extract digits only
  let digits = value.replace(/\D/g, '');

  // Limit to 16 digits only
  digits = digits.substring(0, 16);

  if (digits.length === 0) {
    return '•••• •••• •••• ••••';
  }

  // Format every 4 digits
  return digits.replace(/(.{4})/g, '$1 ').trim();
}
}
