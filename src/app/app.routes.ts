import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'no-access',
    loadComponent: () =>
      import('./pages/no-access/no-access.component').then(
        (m) => m.NoAccessComponent
      ),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./navbar/navbar.component').then((m) => m.NavbarComponent),
    children: [
      { path: '', redirectTo: 'home_page', pathMatch: 'full' },
      {
        path: 'home_page',
        loadComponent: () =>
          import('./home_page/home_page.component').then(
            (m) => m.HomePageComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'investment',
        loadComponent: () =>
          import('./investment/investment.component').then(
            (m) => m.InvestmentComponent
          ),
      },
      {
        path: 'transaction',
        loadComponent: () =>
          import('./transaction/transaction.component').then(
            (m) => m.TransactionComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
      },

      {
        path: 'admin-main',
        loadComponent: () =>
          import('./admin-main/admin-main/admin-main.component').then(
            (m) => m.AdminMainComponent
          ),
        children: [
          {
            path: 'investment-plans',
            loadComponent: () =>
              import(
                './admin-main/investment-plans/investment-plans.component'
              ).then((m) => m.InvestmentPlansComponent),
          },
          {
            path: 'overview',
            loadComponent: () =>
              import('./admin-main/overview/overview.component').then(
                (m) => m.OverviewComponent
              ),
          },
          {
            path: 'category',
            loadComponent: () =>
              import('./admin-main/category/category.component').then(
                (m) => m.CategoryComponent
              ),
          },
          {
            path: 'logs',
            loadComponent: () =>
              import('./admin-main/logs/logs.component').then(
                (m) => m.LogsComponent
              ),
          },
          { path: '', redirectTo: 'about', pathMatch: 'full' }, // default child
        ],
      },
    ],
  },
  { path: '**', redirectTo: '/auth' },
];
