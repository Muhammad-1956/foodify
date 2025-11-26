import { Component, input } from '@angular/core';
import { Dish, DishComponent } from '../dish/dish.component';

@Component({
  selector: 'app-dishes',
  standalone: true,
  imports: [DishComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent {
  dishes = input.required<Dish[]>();
}
