import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Post } from '../../main-page/shared/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = 'http://localhost:5000/posts';

  constructor(private readonly http: HttpClient) {}

  fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  fetchPostDetailsById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
