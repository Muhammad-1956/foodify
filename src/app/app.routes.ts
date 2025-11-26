import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '', redirectTo:'auth', pathMatch:'full'
  },
  // ALL OTHER ROUTES USE CONTAINER
  {
    path: '',
    loadComponent: () =>
      import('./features/container/container.component').then(
        (c) => c.ContainerComponent
      ),
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then(
            (c) => c.CartComponent
          ),
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./features/favorite/favorite.component').then(
            (c) => c.FavoriteComponent
          ),
      },
      {
        path: 'meals',
        loadComponent: () =>
          import('./features/meals/meals.component').then(
            (c) => c.MealsComponent
          ),
      },
      {
        path: 'meal-details',
        loadComponent: () =>
          import('./features/meal-details/meal-details.component').then(
            (c) => c.MealDetailsComponent
          ),
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./features/payment/payment.component').then(
            (c) => c.PaymentComponent
          ),
      },
      {
        path: 'payment/add-card',
        loadComponent: () =>
          import('./features/payment/add-card/add-card.component').then(
            (c) => c.AddCardComponent
          ),
      },
    ],
  },
];
