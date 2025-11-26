import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";



@Injectable({
  providedIn:'root'
})

export class FavoriteService{
  private httpClient = inject(HttpClient)
  favorites= signal<any>([])
  _favorites= this.favorites.asReadonly();
  toggleFavorite(dish_id: string){
    return this.httpClient.post(`favorite/${dish_id}`,{});
  }

  getFavorites(){
    return this.httpClient.get('favorites')
  }

}
