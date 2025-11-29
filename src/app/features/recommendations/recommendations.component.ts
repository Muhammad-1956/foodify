import { Component, signal } from '@angular/core';
import { MealService } from '../services/meal.service';
import { CurrencyPipe } from '@angular/common';
import { DishesComponent } from '../dishes/dishes.component';
import { Dish } from '../dish/dish.component';
import { FavoriteService } from '../services/favorite.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [ DishesComponent, SpinnerComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
})
export class RecommendationsComponent {
  chefRecommendations: Dish | any = signal([]);
  chefRecommendationsFav: Dish | any = signal([]);
  isLoading = signal(true);

  constructor(private mealService: MealService, private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.getRecommendedMeals();
    this.getFavorites();
  }
  getRecommendedMeals() {

    this.mealService.getRecommended().subscribe({
      next: (res: any) => {
        this.chefRecommendations.set(res.data);
        this.isLoading.set(false)
      },
    });
  }

  getFavorites(){
    this.favoriteService.getFavorites().subscribe({
      next: (res:any)=>{
        this.chefRecommendationsFav.set(res.data);
      }
    })
  }
}
