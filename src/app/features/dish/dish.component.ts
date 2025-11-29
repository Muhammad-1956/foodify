import { Component, input, output, signal } from '@angular/core';
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
  styleUrl: './dish.component.scss',
})
export class DishComponent {
  maxStars = [1, 2, 3, 4, 5];
  dish = input.required<[] | any>();
  fav: any[] = [];
  favAPi = []
  isToggle = signal(false);
  updateFav = output();
  constructor(
    private router: Router,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(){
    // Know If Favorite Dish to Make Heart Filled...
    this.isFavoriteDish();
  }

  // Navigation to Meal-details
  onClick(dish_id: string) {
    this.router.navigate(['/meal-details'], { queryParams: { dish_id } });
  }

  // Add- Remove Dish to-from Favorties
  toggle(id: string) {
    this.favoriteService.toggleFavorite(id).subscribe({
      next: (res: any) => {
        if (res.message === "Removed from favorites") {
          this.DeleteFromFavs(id)
          this.toastr.error(res.message);
        } else if (res.message === "Added to favorites") {
          this.addToFavs(id)
          this.toastr.success(res.message);
        }
        this.isToggle.update((preValue) => !preValue);
      }
    });
  }
  // Add To Carts
  addToCart(dish_id: string) {
    // Add To Cart
    this.cartService.addToCart(dish_id, '1').subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
    });
  }

  // Favorite - LocalStorage
  addToFavs(id: string){
    if("fav" in localStorage){
      this.fav = JSON.parse(localStorage.getItem("fav")!)
      this.fav.find(custom_item => custom_item.id == id) ?  true: this.add(id);
    }else{
      this.add(id)
    }
  }
  add(id: string){
    this.fav.push(id)
    localStorage.setItem("fav", JSON.stringify(this.fav))
  }
  DeleteFromFavs(id: string){
      this.fav = JSON.parse(localStorage.getItem("fav")!)
      this.fav= this.fav.filter((d:any) => d != id)
      this.remove(this.fav);
  }
  remove(fav: any){
    localStorage.setItem("fav", JSON.stringify(this.fav))
    this.updateFav.emit();
  }
  // Favorite - LocalStorage />
  isFavoriteDish(){
    if ('fav' in localStorage) {
      this.fav = JSON.parse(localStorage.getItem('fav')!);
      const arrDish = Array(this.dish())
      // console.log(arrDish)
      if( arrDish.some(dish => this.fav.includes(dish.id))){
        // console.log('fav')
        this.isToggle.set(true);
      }else{
        this.isToggle.set(false);
      }

    }
    this.favoriteService.getFavorites().subscribe({
      next: (res: any) => this.favAPi = res.data
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
