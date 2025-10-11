import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminSettingComponent } from './pages/admin-setting/admin-setting.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin-setting', component: AdminSettingComponent }
];
