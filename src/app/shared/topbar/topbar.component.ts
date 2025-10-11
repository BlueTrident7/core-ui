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
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, InputTextModule, ButtonModule, AvatarModule, BadgeModule, CalendarModule, OverlayPanelModule, MenuModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  dateRange: Date[] = [];

  profileMenuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Admin Setting', icon: 'pi pi-cog', routerLink: '/admin-setting' },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  logout() {
    // Implement logout logic
    console.log('Logout');
  }
}
