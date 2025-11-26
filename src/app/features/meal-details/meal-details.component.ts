import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { MealService } from '../services/meal.service';
import { ActivatedRoute } from '@angular/router';
import { EmptyComponent } from '../../shared/empty/empty.component';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [EmptyComponent],
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.scss'
})
export class MealDetailsComponent {

    dish_id=''

    constructor(private mealService: MealService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    }

    ngOnInit(){
      this.route.queryParams.subscribe((params: any) => {
        this.dish_id = params['dish_id'];
      });

      this.mealService.getDetails(this.dish_id).subscribe({
        next: (res:any)=>{
          this.meal.set(res.data)

        }
      })
    }

meal = signal<DishDetails| any>({});

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
