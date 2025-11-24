import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../core/environment/environment";


@Injectable({
  providedIn:'root'
})

export class MealService{

  private httpClient = inject(HttpClient);

  //Get Recommend Meals
  getRecommended(){
    return this.httpClient.get(`recommended`);
  }

  //Get Categories Meals
  getCategories(){
    return this.httpClient.get(`categories`);
  }
}
