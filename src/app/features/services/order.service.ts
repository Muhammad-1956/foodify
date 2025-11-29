import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class OderService{
  private httpClient = inject(HttpClient)

  // Add Order/s
  addOrder(fd: FormData){
    return this.httpClient.post(`orders`,fd)
  }

  // get Orders
  getOrders(){
    return this.httpClient.get('orders')
  }

}
