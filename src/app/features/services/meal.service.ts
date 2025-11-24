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
    const userToken = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${environment.apiBaseUrl}recommended`, {headers});
  }
  //Get Categories Meals
  getCategories(){
    const userToken = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    });
    return this.httpClient.get(`${environment.apiBaseUrl}categories`, {headers});
  }
}
