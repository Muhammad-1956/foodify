import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { PaymentService } from '../services/payment.service';
import { CommonModule } from '@angular/common';
import { MaskedCardPipe } from '../pipes/masked-card.pipe';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule, MaskedCardPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  cards = signal<any>([]);
  id = signal(0);
  total_items= signal(0)
  total_price= signal(0)
  form = new FormGroup({
    payment: new FormControl(['', Validators.required])
  })


  constructor(private paymentService: PaymentService, private cartService: CartService, private router: Router){

  }
  ngOnInit(){
    this.getCards();
    console.log("Cart Info Object",this.cartService.cartInfo);
    const cart = this.cartService.cartInfo;
    this.total_items.set(cart.total_items)
    this.total_price.set(cart.total_price)
  }
  getCards(){
    this.paymentService.getPaymentMethods().subscribe({
      next: (res:any)=>{
        console.log('Hello From Get Cards')
        this.cards.set(res.data);
        console.log(res)
      }
    })
  }

  sendId(id: number){
    this.id.set(id)
    console.log(this.id())
  }
  onConfirm(){
    this.router.navigate(['/home'])
  }
  onSubmit(){
  }
}
