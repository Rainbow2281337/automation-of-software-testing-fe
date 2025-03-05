import { Routes } from '@angular/router';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationPageComponent },
  { path: 'auth', component: AuthPageComponent },
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
