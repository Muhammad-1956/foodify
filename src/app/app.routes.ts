import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
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
          import('./features/home/home.component').then((c) => c.HomeComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'meals',
        loadComponent: () =>
          import('./features/meals/meals.component').then(
            (c) => c.MealsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'meal-details',
        loadComponent: () =>
          import('./features/meal-details/meal-details.component').then(
            (c) => c.MealDetailsComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((c) => c.CartComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'favorite',
        loadComponent: () =>
          import('./features/favorite/favorite.component').then(
            (c) => c.FavoriteComponent
          ),
      },
    ],
  },
  {
    path: 'payment',
    loadComponent: () =>
      import('./features/payment/payment.component').then(
        (c) => c.PaymentComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/add-card',
    loadComponent: () =>
      import('./features/payment/add-card/add-card.component').then(
        (c) => c.AddCardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'personal-information',
    loadComponent: () =>
      import(
        './features/personal-information/personal-information.component'
      ).then((c) => c.PersonalInformationComponent),
    canActivate: [AuthGuard],
  },
];
