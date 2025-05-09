import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import { PORT } from '../shared/consts';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `http://localhost:${PORT}/user`;

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches user data by email
   *
   * @param email - email of the user
   * @returns - Observable<User>
   */
  getUserDataByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email/${email}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  /**
   * Update user data with provided updated data and userId
   *
   * @param userId - userId of the user
   * @returns - Observable<User>
   */
  updateUser(userId: string, updatedData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedData).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
