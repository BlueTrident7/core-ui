import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './app/interceptors/token.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(ReactiveFormsModule),
    CookieService,
    MessageService,
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
}).catch((err) => console.error(err));
