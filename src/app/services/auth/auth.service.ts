import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { UserPayload } from '../../auth-page/shared/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/auth';

  constructor(private readonly http: HttpClient) {}

  /**
   * Takes the user login data and sends it to the server.
   * In response, if the user found, the server sends a token
   * that is saved in the local storage.
   *
   * @param email - User email
   * @param password - User password
   * @returns - Observable<UserPayload>
   */
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

  /**
   * Takes the user registration data and sends it to the server.
   * In response, if the user found, server sends a token
   * that is saved in the local storage.
   *
   * @param email - User email
   * @param userName - User userName
   * @param password - User password
   * @returns - Observable<UserPayload>
   */
  register(
    email: string,
    userName: string,
    password: string
  ): Observable<UserPayload> {
    const payload = { email, userName, password };

    return this.http.post<UserPayload>(`${this.apiUrl}/register`, payload).pipe(
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
