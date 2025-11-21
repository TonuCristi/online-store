import { Routes } from '@angular/router';

import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { HomePage } from './pages/home-page/home-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { ProductsPage } from './pages/products-page/products-page';
import { AdminPage } from './pages/admin-page/admin-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { adminGuard } from './guards/admin-guard';

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
        component: ProfilePage,
        canActivate: [authGuard],
      },
      {
        path: 'admin',
        component: AdminPage,
        canActivate: [authGuard, adminGuard],
      },
      {
        path: 'products/:categoryId',
        component: ProductsPage,
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
        canActivate: [guestGuard],
      },
      {
        path: 'register',
        component: RegisterPage,
        canActivate: [guestGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
