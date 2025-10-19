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
    { label: 'Home', icon: 'pi pi-home', routerLink: '/', title: 'Home' },
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-line',
      routerLink: '/dashboard',
      title: 'Dashboard',
    },
    {
      label: 'Portfolio',
      icon: 'pi pi-briefcase',
      routerLink: '/portfolio',
      title: 'Portfolio',
    },
    {
      label: 'Transaction',
      icon: 'pi pi-exchange',
      routerLink: '/transaction',
      title: 'Transaction',
    },
    {
      label: 'Investment',
      icon: 'pi pi-money-bill',
      routerLink: '/investment',
      title: 'Investment',
    },
    { label: 'Admin', icon: 'pi pi-cog', routerLink: '/admin', title: 'Admin' },
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
