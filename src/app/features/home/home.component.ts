import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { MealService } from '../services/meal.service';
import { CategoriesComponent } from '../categories/categories.component';
import { RecommendationsComponent } from '../recommendations/recommendations.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategoriesComponent, RecommendationsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dishesFromNavbar: any[] = []; // Store emitted dishes

  onDishesFromNavbar(event: any) {
  console.log('home', event);  // Should print array
  this.dishesFromNavbar = event;
}

}

