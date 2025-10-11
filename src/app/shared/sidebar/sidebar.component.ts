import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRIMENG_MODULES } from '../../primeng-exports';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ...PRIMENG_MODULES],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Dashboard', icon: 'pi pi-chart-line', routerLink: '/dashboard' },
    { label: 'Portfolio', icon: 'pi pi-briefcase', routerLink: '/portfolio' },
    { label: 'Transaction', icon: 'pi pi-exchange', routerLink: '/transaction' },
    { label: 'Admin', icon: 'pi pi-cog', routerLink: '/admin' }
  ];
}
