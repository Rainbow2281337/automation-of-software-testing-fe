import { Component, Input } from '@angular/core';
import { Post } from '../shared/post.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  /**
   * The post to display
   *
   * @memberof PostItemComponent
   */
  @Input() post: Post | undefined;

  constructor(private readonly router: Router) {}

  onPostClick(postId: string) {
    this.router.navigate([`/main/post/${postId}`]);
  }
}
