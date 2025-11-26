import { Component, signal } from '@angular/core';
import { MealService } from '../services/meal.service';
import { CurrencyPipe } from '@angular/common';
import { DishesComponent } from '../dishes/dishes.component';
import { Dish } from '../dish/dish.component';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CurrencyPipe, DishesComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
})
export class RecommendationsComponent {
  chefRecommendations: Dish | any = signal([]);

  constructor(private mealService: MealService) {}

  ngOnInit() {
    this.getRecommendedMeals();
  }
  getRecommendedMeals() {
    this.mealService.getRecommended().subscribe({
      next: (res: any) => {
        this.chefRecommendations.set(res.data);
      },
    });
  }
}
