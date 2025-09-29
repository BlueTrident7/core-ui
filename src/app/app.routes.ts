import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent) },
  { path: 'forgot-password', loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
  {
    path: 'main',
    loadComponent: () => import('./navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'investment', loadComponent: () => import('./investment/investment.component').then(m => m.InvestmentComponent) },
      { path: 'transaction', loadComponent: () => import('./transaction/transaction.component').then(m => m.TransactionComponent) },
      { path: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'payment', loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent) },
      { path: 'admin-panel', loadComponent: () => import('./admin-panel/admin-panel.component').then(m => m.AdminPanelComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/auth' }
];
