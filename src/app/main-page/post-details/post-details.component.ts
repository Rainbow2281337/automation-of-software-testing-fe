import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post.interface';
import { Subject, takeUntil } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import { CommentService } from '../../services/comment/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../shared/comments.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-details',
  imports: [FormsModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  /**
   * The post to display
   *
   * @memberof PostDetailsComponent
   */
  post!: Post;

  /**
   * The list of comments
   *
   * @memberof PostDetailsComponent
   */
  comments!: Comment[];

  /**
   * The comment to add
   *
   * @memberof PostDetailsComponent
   */
  commentToAdd: string = '';

  private readonly destroySub$ = new Subject<void>();

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  /**
   * Gets the post ID from the route.
   * If the ID is present, it calls the fetchPostDetails function,
   * then calls fetchComments function.
   */
  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');

    if (postId) {
      this.fetchPostDetails(postId);
      this.fetchComments(postId);
    }
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  /**
   * Fetches the post details from the server
   *
   * @param postId - The ID of the post to fetch
   * @memberof PostDetailsComponent
   * @remarks
   * It fetches the post details from the server and subscribes to the observable.
   * When the observable emits a value, the post details are stored in the post property.
   */
  fetchPostDetails(postId: string) {
    this.postService
      .fetchPostDetailsById(postId)
      .pipe(takeUntil(this.destroySub$))
      .subscribe({
        next: (post) => {
          this.post = post;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  /**
   * Fetches all the comments of the post from the server
   *
   * @param postId - The ID of the post to fetch the comments
   * @memberof PostDetailsComponent
   * @remarks
   * It fetches the comments of the post from the server and subscribes to the observable.
   * When the observable emits a value, the comments are stored in the comments property.
   */
  fetchComments(postId: string) {
    this.commentService
      .fetchAllCommentsByPostId(postId)
      .pipe(takeUntil(this.destroySub$))
      .subscribe({
        next: (comments) => {
          this.comments = comments;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  /**
   * Creates a new comment for the post
   *
   * @param postId - The ID of the post to add the comment
   * @memberof PostDetailsComponent
   * @remarks
   * It checks if the comment to add is empty.
   * If it is not empty, it calls the createComment function from the comment service.
   */
  addComment(postId: string) {
    if (!this.commentToAdd.trim()) {
      return;
    }

    this.commentService.createComment(postId, this.commentToAdd).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.commentToAdd = '';
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  private destroySubscriptions() {
    this.destroySub$.next();
    this.destroySub$.complete();
  }
}
