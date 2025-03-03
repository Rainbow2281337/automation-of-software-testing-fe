import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { UserPayload } from '../../auth-page/share/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<UserPayload> {
    const payload = { email, password };

    return this.http.post<UserPayload>(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => {
        if (response.access_token) {
          localStorage.setItem('auth_token', response.access_token);
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
