import { Component, signal } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categories: any = signal([]);

    constructor(private mealService: MealService, private router: Router){

    }

    ngOnInit(){
      this.getCategories()
    }
    getCategories(){
      this.mealService.getCategories().subscribe({
        next: (res:any)=>{
          this.categories.set(res.data)
        }
      })
    }

    // Navigate to Category's Dishses
    onClick(category_id: string){
      this.router.navigate(['/meals'],{queryParams: {category_id}})
    }
}
