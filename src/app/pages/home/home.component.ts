import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showScrollButton: boolean = false;
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  // Toggle mobile menu
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const navList = document.querySelector('.nav-list') as HTMLElement;
    if (navList) {
      navList.style.display = this.menuOpen ? 'flex' : 'none';
    }
  }

  // Scroll to top functionality
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Listen for scroll events to show/hide scroll button
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollButton = window.pageYOffset > 300;
  }

  // Navigate to investment page
  navigateToInvestment(): void {
    this.router.navigate(['/main/investment']);
  }
}
