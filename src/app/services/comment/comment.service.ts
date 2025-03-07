import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Comment } from '../../main-page/shared/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly apiUrl = 'http://localhost:5000/comment';

  constructor(private readonly http: HttpClient) {}

  /**
   * Sets the postId as a query parameter and fetch all comments for that post
   *
   * @param postId - post id
   * @returns - Observable<Comment[]>
   */
  fetchAllCommentsByPostId(postId: string): Observable<Comment[]> {
    const params = new HttpParams().set('postId', postId);

    return this.http.get<Comment[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  /**
   * Creates a new comment
   *
   * @param postId - post id
   * @param comment - comment
   * @returns - Observable<Comment>
   */
  createComment(postId: string, comment: string): Observable<Comment> {
    const payload = { postId, comment };

    return this.http.post<Comment>(this.apiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
