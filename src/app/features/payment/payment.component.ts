import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { PaymentService } from '../services/payment.service';
import { CommonModule } from '@angular/common';
import { MaskedCardPipe } from '../pipes/masked-card.pipe';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { CartService } from '../services/cart.service';
import { OderService } from '../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink, CommonModule, MaskedCardPipe, FormsModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  cards = signal<any>([]);
  id = signal(0);
  total_items= 0
  total_price= 0
  isLoading = signal(true)

  form = new FormGroup({
    payment: new FormControl('', Validators.required)
  })


  constructor(
    private paymentService: PaymentService,
    private cartService: CartService,
    private router: Router,
    private oderService: OderService,
    private toastr: ToastrService
  ){
    const cart = this.cartService.cartInfo;
    this.total_items= cart.total_items
    this.total_price= cart.total_price
  }
  ngOnInit(){
    this.getCards();
    console.log("Cart Info Object",this.cartService.cartInfo);
    // const cart = this.cartService.cartInfo;
    this.total_items= this.cartService.cartInfo.total_items
    this.total_price= this.cartService.cartInfo.total_price
  }
  getCards(){
    this.paymentService.getPaymentMethods().subscribe({
      next: (res:any)=>{
        console.log('Hello From Get Cards')
        this.cards.set(res.data);
        this.isLoading.set(false)
      }
    })
  }

  sendId(id: number){
    this.id.set(id)
    console.log(this.id())
  }
  onConfirm(){
    const fd = new FormData();
    const payment_method_id = this.id().toString()
    fd.append('payment_method_id',payment_method_id)
    this.oderService.addOrder(fd).subscribe({
      next: (res:any)=>{
        this.toastr.success('Payment completed successfully.')
        this.router.navigate(['/home'])
      },
      error: (err: Error)=>{
        this.toastr.error(err.message)
      }

    })
  }
  onSubmit() {
  if (this.form.invalid) return; // ✅ hard security block

  const modal = new (window as any).bootstrap.Modal(
    document.getElementById('confirmModal')
  );

  modal.show();
}

}
