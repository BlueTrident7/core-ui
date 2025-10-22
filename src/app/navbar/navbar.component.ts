import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { UserData } from '../base/api/user-data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, InputTextModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public router: Router, public userData: UserData) {}

  onLogout() {
    // ✅ Clear tokens and user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userProfile');

    this.router.navigate(['/auth']);
  }
  getAvatar() {
    const gender = this.userData?.userProfile?.gender?.toLowerCase();

    if (gender === 'male') {
      return 'assets/avatar/male.png';
    } else {
      return 'assets/avatar/female.png';
    }
  }
}
