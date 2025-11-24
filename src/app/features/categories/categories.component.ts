import { Component, signal } from '@angular/core';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categories: any = signal([]);

    constructor(private mealService: MealService){

    }

    ngOnInit(){
      this.getCategories()
    }
    getCategories(){
      this.mealService.getCategories().subscribe({
        next: (res:any)=>{
          this.categories.set(res.data)
          console.log(res.data)
        }
      })
    }
}
