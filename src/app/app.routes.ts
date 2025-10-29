import { Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./pages/login/login.component').then((m) => m.LoginComponent),
  // },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./pages/register/register.component').then((m) => m.RegisterComponent),
  // },

  // ✅ Wrap all main pages inside NavbarComponent
  {
    path: 'main',
    component: NavbarComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'investment',
        loadComponent: () =>
          import('./pages/investment/investment.component').then(
            (m) => m.InvestmentComponent
          ),
      },
      {
        path: 'transaction',
        loadComponent: () =>
          import('./pages/transaction/transaction.component').then(
            (m) => m.TransactionComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'maintenance',
        loadComponent: () =>
          import('./pages/maintenance/maintenance.component').then((m) => m.MaintenanceComponent),
      },
      {
        path: 'admin-main',
        loadComponent: () =>
          import('./pages/admin-main/admin-main/admin-main.component').then((m) => m.AdminMainComponent),
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          {
            path: 'category',
            loadComponent: () =>
              import('./pages/admin-main/category/category.component').then((m) => m.CategoryComponent),
          },
          {
            path: 'investment-plans',
            loadComponent: () =>
              import('./pages/admin-main/investment-plans/investment-plans.component').then((m) => m.InvestmentPlansComponent),
          },
          {
            path: 'logs',
            loadComponent: () =>
              import('./pages/admin-main/logs/logs.component').then((m) => m.LogsComponent),
          },
          {
            path: 'overview',
            loadComponent: () =>
              import('./pages/admin-main/overview/overview.component').then((m) => m.OverviewComponent),
          },
        ],
      },
    ],
  },

  { path: '**', redirectTo: 'main/portfolio', pathMatch: 'full' },
];
