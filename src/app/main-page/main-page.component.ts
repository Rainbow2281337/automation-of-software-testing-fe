import { Component, ViewChild } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';
import { SearchBarComponent } from '../navigation/search-bar/search-bar.component';
import { ProfileButtonComponent } from '../navigation/profile-button/profile-button.component';
import { AddPostButtonComponent } from '../navigation/add-post-button/add-post-button.component';

@Component({
  selector: 'app-main-page',
  imports: [
    PostListComponent,
    SearchBarComponent,
    ProfileButtonComponent,
    AddPostButtonComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  @ViewChild(PostListComponent) postListComponent!: PostListComponent;

  /**
   * This method is called when the user searches for a specific title in the post
   *
   * @param keyword - The keyword to search for
   */
  onSearch(keyword: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    keyword.trim()
      ? this.postListComponent.fetchPosts({ title: keyword })
      : this.postListComponent.fetchPosts();
  }
}
