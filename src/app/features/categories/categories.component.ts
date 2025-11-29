import { Component, signal } from '@angular/core';
import { MealService } from '../services/meal.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categories: any = signal([]);
  isLoading = signal(true)
    constructor(private mealService: MealService, private router: Router){

    }

    ngOnInit(){
      this.getCategories()
    }
    getCategories(){
      this.mealService.getCategories().subscribe({
        next: (res:any)=>{
          this.categories.set(res.data)
          this.isLoading.set(false)
        }
      })
    }

    // Navigate to Category's Dishses
    onClick(category_id: string,category_name: string){
      this.router.navigate(['/meals'],{queryParams: {category_id,category_name}})
    }
}
