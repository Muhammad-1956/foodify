import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class PaymentService{
  private httpClient = inject(HttpClient)

  addCard(fd: FormData){
    return this.httpClient.post(`payment-methods`,fd)
  }

  getPaymentMethods(){
    return this.httpClient.get('payment-methods')
  }

}
