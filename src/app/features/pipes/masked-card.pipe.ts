import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskedCard',
  standalone: true,
})
export class MaskedCardPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '**** **** **** 0000';

    // Keep only digits
    const digits = value.replace(/\D/g, '');

    // Get last 4 digits
    const last4 = digits.slice(-4);

    // Return masked form
    return `**** **** **** ${last4.padStart(4, '0')}`;
  }

}
