import { ChangeDetectorRef, Component, OnChanges, signal } from '@angular/core';
import { EmptyComponent } from '../../shared/empty/empty.component';
import { DishComponent } from '../dish/dish.component';
import { FavoriteService } from '../services/favorite.service';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [EmptyComponent, DishComponent, RouterLink, SpinnerComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {
  image = './assets/images/fav-empty.png'
  content = 'Discover healthy meals and add your favorites to find them easily later'
  path = '/categories'
  favorites = signal<any[]>([]);
  ids: any;
  favStorage: any[] = []
  isLoading = signal(true)
  constructor(private favoriteService: FavoriteService){

  }
  ngOnInit(){
    this.getFavtorites()
  }

  getFavtorites(){
    const res =this.favoriteService.getFavorites().subscribe({
      next: (res:any)=>{
        this.favorites.set(res.data)
        this.isLoading.set(false)
      }
    })
  }

  UpdateFavs() {
  const ids: number[] = JSON.parse(localStorage.getItem('fav') || '[]');
  const filtered = this.favorites().filter(
    (dish: any) => ids.includes(dish.id)
  );
  this.favorites.set([...filtered]); // force new reference
}


}
