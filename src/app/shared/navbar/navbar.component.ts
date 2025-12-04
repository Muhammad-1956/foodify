import { Component, Output, output, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { MealService } from '../../features/services/meal.service';
import { ProfileService } from '../../features/services/profile.service';
import { User } from '../../features/interfaces/user.interface';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PopUpComponent],
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

constructor(private api: MealService, private profileService: ProfileService, private route: ActivatedRoute, private router: Router) {
  this.route.queryParams.subscribe((params: any) => {
      this.categoryId = params['category_id'];
    });
}

ngOnInit() {
  this.loadDishes();
  const currentUrl = this.router.url; // e.g. '/menu/dishes/123'
  this.isDishesRoute = currentUrl.includes('dishes');
  this.getInfo();
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

userInfo = signal<User | any>({})
getInfo() {
this.profileService.getProfile().subscribe({
next: (res: any) => {
this.userInfo.set(res);
  console.log(this.userInfo())
    // Populate form
    // const [day, month, year] = res.birthday?.split('-') || ['', '', ''];
    // this.personalForm.setValue({
    //   fullName: res.name || '',
    //   email: res.email || '',
    //   phone: res.phone || '',
    //   birthDay: day,
    //   birthMonth: month,
    //   birthYear: year,
    //   address: res.address || ''
    // });
  }
});

}}
