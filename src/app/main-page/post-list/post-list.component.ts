import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { Post } from '../shared/post.interface';
import { Subject, takeUntil } from 'rxjs';
import { PostItemComponent } from '../post-item/post-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [PostItemComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  /**
   * The list of posts
   *
   * @memberof PostListComponent
   */
  postList: Post[] = [];

  /**
   * Indicates if the data is loading
   *
   * @memberof PostListComponent
   */
  isLoading: boolean = false;

  private destroySub$ = new Subject<void>();

  constructor(
    private readonly postService: PostService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  /**
   * Fetches the posts from the server
   *
   * @memberof PostListComponent
   * @remarks
   * This function first destroys any existing subscriptions to ensure that there are no memory leaks.
   * It then initializes a new subject for managing subscriptions.
   * It then fetches the posts from the server and subscribes to the observable.
   * When the observable emits a value, the posts are stored in the postList property.
   */
  fetchPosts() {
    this.isLoading = true;
    this.destroySubscriptions();
    this.destroySub$ = new Subject<void>();

    this.postService
      .fetchPosts()
      .pipe(takeUntil(this.destroySub$))
      .subscribe({
        next: (posts) => {
          this.isLoading = false;
          this.postList = posts;
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth']);
          console.error('Error:', error); // TODO: REPALCE WITH ERROR HANDLER
        },
      });
  }

  private destroySubscriptions() {
    this.destroySub$.next();
    this.destroySub$.complete();
  }
}
