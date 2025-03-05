import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Comment } from '../../main-page/shared/comments.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly apiUrl = 'http://localhost:5000/comment';

  constructor(private readonly http: HttpClient) {}

  fetchAllCommentsByPostId(postId: string) {
    const params = new HttpParams().set('postId', postId);

    return this.http.get<Comment[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  createComment(postId: string, comment: string) {
    const payload = { postId, comment };

    return this.http.post<Comment>(this.apiUrl, payload).pipe(
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }
}
