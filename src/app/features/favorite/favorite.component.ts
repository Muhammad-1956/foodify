import { Component, signal } from '@angular/core';
import { EmptyComponent } from '../../shared/empty/empty.component';
import { DishComponent } from '../dish/dish.component';
import { FavoriteService } from '../services/favorite.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [EmptyComponent, DishComponent, RouterLink],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  image = './assets/images/fav-empty.png'
  content = 'Discover healthy meals and add your favorites to find them easily later'
  path = '/categories'
  favorites = signal<any>([]);

  constructor(private favoriteService: FavoriteService){

  }
  ngOnInit(){
    this.getFavtorites()
  }

  getFavtorites(){
    const res =this.favoriteService.getFavorites().subscribe({
      next: (res:any)=>{
        this.favorites.set(res.data)
        console.log(res)
      }
    })
  }
}
