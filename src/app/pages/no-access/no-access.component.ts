import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-no-access',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.css'],
})
export class NoAccessComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if the page is being refreshed
    if (sessionStorage.getItem('no-access-loaded')) {
      // If refreshed, redirect to home page
      this.router.navigate(['/main/home_page']);
    } else {
      // Set flag on first load
      sessionStorage.setItem('no-access-loaded', 'true');
    }
  }

  goHome() {
    // navigate to root - change as needed
    this.router.navigate(['/']);
  }

  contactSupport() {
    // open mail client or route to support page
    window.location.href = 'mailto:support@example.com?subject=Access%20request';
  }
}
