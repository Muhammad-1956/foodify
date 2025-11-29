import { Component, Output, output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MealService } from '../../features/services/meal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activePanel: 'cart' | 'notif' | null = null;

  togglePanel(panel: 'cart' | 'notif') {
    if (this.activePanel === panel) {
      this.activePanel = null;
    } else {
      this.activePanel = panel;
    }
  }
  emitDishArr = output<any[]>()
  dishes: any[] = [];
  categoryId: any = '1';
  isDishesRoute = false;

constructor(private api: MealService,private route: ActivatedRoute, private router: Router) {
  this.route.queryParams.subscribe((params: any) => {
      this.categoryId = params['category_id'];
    });
}

ngOnInit() {
  this.loadDishes();
  const currentUrl = this.router.url; // e.g. '/menu/dishes/123'
  this.isDishesRoute = currentUrl.includes('dishes');
}

loadDishes(search: string = '') {
  // this.api.getDishes(this.categoryId, search)
  //   .subscribe((res: any) => {

  //     this.dishes = res.data;

  //     console.log("Before emit:", this.dishes);

  //     this.emitDishArr.emit(this.dishes); // send to parent

  //     console.log("After emit");
  //   });
}


onSearch(event: any) {
  // const value = event.target.value;
  // this.isDishesRoute ? this.api.getCategories(value).subscribe({
  //   next: (res: any)=>{
  //     this.dishes = res
  //     console.log(res)
  //   }
  // }) : this.loadDishes(value)
}

}
