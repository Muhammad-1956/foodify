import { Component, computed, signal } from '@angular/core';
import { EmptyComponent } from '../../shared/empty/empty.component';
import { MealService } from '../services/meal.service';
import { DishComponent } from '../dish/dish.component';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { CartService } from '../services/cart.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [EmptyComponent, SpinnerComponent, RouterLink, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  image = './assets/images/cart-empty.png'
  content = 'Add your favorite meals and start your healthy journey with Foodify!'
  path = '/categories'
  cart= signal<any>('')
  deliveryPrice = signal('30')
  isToggle= signal(false);
  subTotal = signal(0)
  total = signal(0)
  isLoading = signal(true)
  constructor(private mealService: MealService, private cartService: CartService){

  }
  ngOnInit(){
    this.getCart()
  }

    toggle(meal_id: string){
    this.isToggle.update((preValue)=> !preValue);
  }
  RemoveFromCart(meal_id: string){
    this.cartService.removeFromCart(meal_id).subscribe({
      next: (res:any) =>{
        this.cart.update(items => items.filter((item: any) => item.id !== meal_id));
        console.log(res)
      }
    })
  }
  getCart(){
    this.cartService.getCart().subscribe({
      next: (res: any)=>{
        this.cart.set(res.data);
        this.allPrice();
        this.isLoading.set(false)
      }
    })
  }
  allPrice(){
    this.subTotalPrice();
    this.totalPrice();
  }
  subTotalPrice() {
    this.subTotal.set(this.cart().reduce((acc: any, dish: any) => acc + parseFloat(dish.price), 0));
  }
  totalPrice() {
    this.total.set( this.subTotal() + +this.deliveryPrice());
  }

  increment(id: string, currentQty: string) {
    this.cartService.updateQuantity(id, (+currentQty + 1).toString()).subscribe({
    next: (res: any)=>{
      console.log(this.subTotal.set(res.total_price))
      this.totalPrice()
      this.cartService.cartInfo = res
    }})
  this.cart.update(items =>
    items.map((item: any) =>
      item.id === id
        ? { ...item, quantity: currentQty + 1, subtotal: (+currentQty + 1) * item.price }
        : item
    )
  );
}

decrement(id: string, currentQty: string) {
  if (+currentQty <= 1) return;
  this.cartService.updateQuantity(id, (+currentQty - 1).toString()).subscribe({
    next: (res: any)=>{
      this.subTotal.set(res.total_price)
      this.totalPrice()
    }
  })
  this.cart.update(items =>
    items.map((item: any) =>
      item.id === id
        ? { ...item, quantity: +currentQty - 1, subtotal: (+currentQty - 1) * item.price }
        : item
    )
  );
}
}
