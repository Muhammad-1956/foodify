import { Component, input, output } from '@angular/core';
import { Dish, DishComponent } from '../dish/dish.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-dishes',
  standalone: true,
  imports: [DishComponent],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent {
  title = input.required<string>()
  dishes = input.required<Dish[]>();
}
