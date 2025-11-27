import { Component, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MealService } from '../services/meal.service';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorite.service';
import { ToastrService } from 'ngx-toastr';
// import { Dish } from '../interfaces/dish.interface';

@Component({
  selector: 'app-dish',
  standalone: true,
  imports: [],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss'
})
export class DishComponent {
  maxStars = [1,2,3,4,5]
  dish = input.required<[] | any>();
  isToggle= signal(false);
  isFav = signal(false)
  constructor(
    private router: Router,
    private mealService: MealService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private toastr: ToastrService
    ){}




  onClick(dish_id: string){
    this.router.navigate(['/meal-details'],{queryParams: {dish_id}})
  }
  toggle(id: string) {
    this.favoriteService.toggleFavorite(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success(res.message)
        this.isToggle.update((preValue)=> !preValue);
      },
      error: (err: any) => {
        console.error('Failed to toggle favorite', err);
      }
    });
  }

  addToCart(dish_id: string){
      // Add To Cart
      this.cartService.addToCart(dish_id,'1').subscribe({
        next: (res: any)=> {
          this.toastr.success(res.message)
          console.log(res)
        }
      })
  }
}
export interface Dish {
  category: string;
  description: string;
  id: number;
  image: string;
  kcal: number;
  name: string;
  price: string;
  protein: string;
  rating: number;
  reviews: number;
}
