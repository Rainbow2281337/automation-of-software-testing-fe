import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Post } from '../../main-page/shared/post.interface';
import { PORT } from '../shared/consts';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = `http://localhost:${PORT}/posts`;

  constructor(private readonly http: HttpClient) {}

  /**
   * If filters are provided, the method will append them to the URL.
   * And then, it will make a GET request to the API to fetch posts.
   *
   * @param filters - query parameters
   * @returns - Observable<Post[]>
   */
  fetchPosts(filters?: any): Observable<Post[]> {
    const params = filters && new URLSearchParams(filters).toString();
    const url = params ? `${this.apiUrl}?${params}` : this.apiUrl;

    return this.http.get<Post[]>(url).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  /**
   * Fetches post details by its ID.
   *
   * @param postId - post ID
   * @returns - Observable<Post>
   */
  fetchPostDetailsById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  addPost(title: string, content: string): Observable<Post> {
    const payload = { title, content };

    return this.http.post<Post>(this.apiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
