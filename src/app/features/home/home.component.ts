import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { MealService } from '../services/meal.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private mealService: MealService){

  }

  ngOnInit(){
    this.getRecommendedMeals()
  }
  getRecommendedMeals(){
    this.mealService.getRecommended().subscribe({
      next: (res:any)=>{
        console.log(res.data)
      }
    })
  }

}
