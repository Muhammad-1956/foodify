import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
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
      this.activePanel = null; // close if already open
    } else {
      this.activePanel = panel;
    }
  }
  dishes: any[] = [];
categoryId = '1'; // dynamic later

constructor(private api: MealService) {}

ngOnInit() {
  this.loadDishes();
}

loadDishes(search: string = '') {
  this.api.getDishes(this.categoryId, search)
    .subscribe((res: any) => {
      this.dishes = res.data;
    });
}

onSearch(event: any) {
  const value = event.target.value;
  this.loadDishes(value);
}
}
