import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, AppRoutingModule),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
}).catch(err => console.error(err));
