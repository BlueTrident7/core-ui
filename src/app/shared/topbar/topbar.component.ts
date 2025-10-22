import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    CalendarModule,
    OverlayPanelModule,
    MenuModule,
    TooltipModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  dateRange: Date[] = [];

  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/main/home', title: 'Home', effect: 'bounce' },
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-line',
      routerLink: '/main/dashboard',
      title: 'Dashboard',
      effect: 'pulse',
    },
    {
      label: 'Portfolio',
      icon: 'pi pi-briefcase',
      routerLink: '/main/portfolio',
      title: 'Portfolio',
      effect: 'shake',
    },
    {
      label: 'Transaction',
      icon: 'pi pi-list',
      routerLink: '/main/transaction',
      title: 'Transaction',
      effect: 'wobble',
    },
    {
      label: 'Investment',
      icon: 'pi pi-money-bill',
      routerLink: '/main/investment',
      title: 'Investment',
      effect: 'flip',
    },
    { label: 'Admin', icon: 'pi pi-cog', routerLink: '/main/admin', title: 'Admin', hasSpinner: true },
  ];

  profileMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    {
      label: 'Admin Settings',
      icon: 'pi pi-cog',
      routerLink: '/admin-setting',
    },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() },
  ];

  logout() {
    // Implement logout logic
    console.log('Logout');
  }
}
