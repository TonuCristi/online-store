import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { HomePage } from './pages/home-page/home-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { ProductsPage } from './pages/products-page/products-page';
import { ProductsService } from './services/products-service';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../app/pages/profile-page/profile-page').then((m) => m.ProfilePage),
      },
      {
        path: 'products/:categoryId',
        loadComponent: () =>
          import('../app/pages/products-page/products-page').then((m) => m.ProductsPage),
      },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'register',
        component: RegisterPage,
      },
    ],
  },
];
