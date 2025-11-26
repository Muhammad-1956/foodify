import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  cards = signal<any>([]);

  constructor(private paymentService: PaymentService){

  }
  ngOnInit(){

  }
  getCards(){
    this.paymentService.getPaymentMethods().subscribe({
      next: (res:any)=>{
        console.log(res)
      }
    })
  }
}
