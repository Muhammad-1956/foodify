import { Component, signal } from '@angular/core';
import { Dish } from '../dish/dish.component';
import { MealService } from '../services/meal.service';
import { DishesComponent } from '../dishes/dishes.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [DishesComponent],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent {
  meals: Dish | any = signal([]);
  category_id = ''
  category_name = ''
  constructor(private mealService: MealService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      this.category_id = params['category_id'];
      this.category_name = params['category_name'];
      this.category_name == 'Balanced Meals' || this.category_name == 'Smoothies' ?  this.category_name : this.category_name += ' Meals';
    });
  }

  ngOnInit() {
    this.getMeals();
  }
  getMeals() {
    this.mealService.getDishes(this.category_id).subscribe({
      next: (res: any) => {
        this.meals.set(res.data);
        console.log(res.data);
      },
    });
  }
}
