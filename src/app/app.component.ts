import { UserData } from './base/api/user-data';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private loaderService: LoaderService,
    public userData: UserData
  ) {}

  ngOnInit() {
    this.subscription = this.loaderService.loader$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.userData.getUserProfile();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
