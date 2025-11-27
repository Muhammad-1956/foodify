import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn:'root'
})


export class CartService{
  private httpClient  = inject(HttpClient);

    // Get My Cart
  getCart(){
    return this.httpClient.get(`cart`)
  }
  //Add To Cart
  addToCart(dish_id: string, quantity: string){
    const fd = new FormData();
    fd.append('quantity', quantity)
    return this.httpClient.post(`cart/${dish_id}`,fd)
  }
  //Remove To Cart
  removeFromCart(dish_id: string){
    return this.httpClient.delete(`cart/${dish_id}`)
  }
  // Update Quantity
  updateQuantity(dish_id: string, quantity:string){
    const fd = new FormData();
    fd.append('quantity', quantity)
    return this.httpClient.post(`cart/${dish_id}/update-quantity`,fd)
  }


  // Save Total To access by Payment Component
  private _cartInfo = signal<any>('');

  // ⬅ Getter
  get cartInfo() {
    return this._cartInfo();
  }

  // ⬅ Setter
  set cartInfo(value: any) {
    this._cartInfo.set(value);
  }



}
