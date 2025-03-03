import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: '**', component: PageNotFoundComponent },
];
