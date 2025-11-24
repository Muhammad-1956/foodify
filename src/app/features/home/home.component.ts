import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent],
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
