import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CartService } from '../../features/services/cart.service';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
  ,encapsulation: ViewEncapsulation.None
})
export class PopUpComponent {
  cart: any = signal([])
   activePanel = false;

  togglePanel() {
    this.activePanel = !this.activePanel
  }
  constructor(private cartService: CartService){
    this.getCartItems()
  }

  getCartItems(){
    this.cartService.getCart().subscribe({
      next: (res:any)=>{
        this.cart.set(res.data)
        console.log(res)
      }
    })
  }
    RemoveFromCart(meal_id: string){
    this.cartService.removeFromCart(meal_id).subscribe({
      next: (res:any) =>{
        this.cart.update((items: any) => items.filter((item: any) => item.id !== meal_id));
      }
    })
  }
}
