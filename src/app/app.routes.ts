import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationPageComponent },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./auth-page/auth-page.component').then(
            (m) => m.AuthPageComponent
          ),
      },
      {
        path: 'password-forgotten',
        loadComponent: () =>
          import(
            './auth-page/password-forgotten/password-forgotten.component'
          ).then((m) => m.PasswordForgottenComponent),
      },
    ],
  },
  {
    path: 'main',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./main-page/main-page.component').then(
            (m) => m.MainPageComponent
          ),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./main-page/post-list/post-list.component').then(
            (m) => m.PostListComponent
          ),
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./main-page/post-details/post-details.component').then(
            (m) => m.PostDetailsComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
