import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TableModule, FormsModule],
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent implements OnInit {
  selectedItem: number = 0;

  // Sidebar items
  items: string[] = ['Overview', 'Investment Plans', 'Category', 'Logs'];

  // Corresponding child route paths (must match app-routing.module paths exactly)
  routes: string[] = ['overview', 'investment-plans', 'category', 'settings'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const index = params['selectedIndex'];
      this.selectedItem = index !== undefined ? +index : 0;
    });

    // Navigate to default child route
    this.router.navigate([this.routes[this.selectedItem]], {
      relativeTo: this.activatedRoute,
    });
  }

  selectItem(index: number) {
    this.selectedItem = index;
    this.router.navigate([this.routes[index]], {
      relativeTo: this.activatedRoute,
    });
  }
}
