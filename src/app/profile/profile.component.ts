import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'Maria Fernanda',
    role: 'Premium User',
    avatar: 'assets/avatar.png', // replace with your image
    details: {
      role: 'Beatmaker',
      experience: 'Intermediate',
      artists: 'Ninho, Travis Scott, Metro Boomin',
      genre: 'Trap',
      software: 'Ableton',
      mood: 'Melancholic',
      region: 'California, USA',
      availability: true,
      badges: ['Administrator'],
      tags: ['Drill', 'Melancholic', 'Rap-US']
    }
  };
}
