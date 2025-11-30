import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { MealService } from '../services/meal.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyComponent } from '../../shared/empty/empty.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [SpinnerComponent, RouterLink],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.scss'
})
export class MealDetailsComponent {
    meal = signal<DishDetails| any>({});
    isLoading = signal(false)
    dish_id=''

    constructor(private mealService: MealService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    }

    ngOnInit(){
      this.route.queryParams.subscribe((params: any) => {
        this.dish_id = params['dish_id'];
      });

      this.getDetails();

    }

    getDetails(){
      this.isLoading.set(true);
      this.mealService.getDetails(this.dish_id).subscribe({
        next: (res:any)=>{
          this.meal.set(res.data)
          this.isLoading.set(false);
        }
      })
    }

  goBack() {
    history.back();
  }
}
export interface DishDetails {
  name: string;
  image: string;
  description: string;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  kcal: number;
  ingredients: string[];
}
