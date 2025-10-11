import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { PRIMENG_MODULES } from '../../primeng-exports';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule, ...PRIMENG_MODULES],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/', title: 'Home' },
    { label: 'Dashboard', icon: 'pi pi-chart-line', routerLink: '/dashboard', title: 'Dashboard' },
    { label: 'Portfolio', icon: 'pi pi-briefcase', routerLink: '/portfolio', title: 'Portfolio' },
    { label: 'Transaction', icon: 'pi pi-exchange', routerLink: '/transaction', title: 'Transaction' },
    { label: 'Investment', icon: 'pi pi-money-bill', routerLink: '/investment', title: 'Investment' },
    { label: 'Admin', icon: 'pi pi-cog', routerLink: '/admin', title: 'Admin' }
  ];
}
