import { Component, signal } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardNumberPipe } from '../../pipes/card-number.pipe';
import { CardholderNamePipe } from '../../pipes/card-name.pipe';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, FormsModule, CardholderNamePipe, CardNumberPipe, RouterLink],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss'
})
export class AddCardComponent {
  cardType='';
  name = '';
  number = '';
  cvv = '';
  expiryDate='';
  selectedPaymentMethod: string = ''; // visa, mastercard, paypal, apple
  cvvFocus = false;
  showNumber = false;
  isValid = signal(true);
  constructor(private paymentService: PaymentService, private router: Router){

  }
  ngOnInit(): void {

  }

  onCvvFocus() { this.cvvFocus = true; }
  onCvvBlur() { this.cvvFocus = false; }
  toggleNumber() { this.showNumber = !this.showNumber; }

  // Only allow numbers
  onlyCvv(event: any) {
     let value = event.target.value.replace(/\D/g, '');}
  onlyNumbers(event: any) {
     let value = event.target.value.replace(/\D/g, '');

  // Stop at 16 digits
  if (value.length > 16) {
    value = value.substring(0, 16);
  }

  event.target.value = value;   // updates UI
  this.number = value;          // updates ngModel
  }
  //Only allow A-Za-z characters also spaces
  onlyAzChars(event: any){
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^A-Za-z ]/g, '');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const fd = new FormData()
      fd.append('type',this.cardType)
      fd.append('name', this.name),
      fd.append('details', this.number),
      fd.append('csv',this.cvv),
      fd.append('expire_date',this.expiryDate)
      fd.append('is_default','1')
      this.paymentService.addCard(fd).subscribe({
        next: (res:any)=>{
          console.log(res)
          this.router.navigate(['/payment'])
        }
      })
    }
  }
  backToPaymentMethod(){
    this.router.navigate(['/payment/payment-method'])
  }


}
