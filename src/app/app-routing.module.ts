import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'register',
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

  // ✅ Wrap all main pages inside NavbarComponent
  {
    path: 'main',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
        children: [
          {
            path: 'payment',
            loadComponent: () =>
              import('./payment/payment.component').then(
                (m) => m.PaymentComponent
              ),
            outlet: 'payment',
          },
        ],
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
        path: 'admin-contact',
        loadComponent: () =>
          import('./admin-contact/admin-contact.component').then(
            (m) => m.AdminContactComponent
          ),
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
            path: 'settings',
            loadComponent: () =>
              import('./admin-main/logs/logs.component').then(
                (m) => m.LogsComponent
              ),
          },
          { path: '', redirectTo: 'about', pathMatch: 'full' }, // default child
        ],
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
