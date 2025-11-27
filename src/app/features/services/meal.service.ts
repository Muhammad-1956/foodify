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
  getCategories(search?: string){
    return this.httpClient.get(`categories`,
    {
      params: { search: search ?? ''}
    });
  }
  //Get Meals
  getDishes(category_id: string, search?: string){
    return this.httpClient.get(`categories/${category_id}/dishes`,
    {
      params: { search: search ?? ''}
    });
  }
  // Get Dish Details
  getDetails(dish_id:string){
    return this.httpClient.get(`dishes/${dish_id}`)
  }

}
