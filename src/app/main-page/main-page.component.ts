import { Component } from '@angular/core';
import { PostListComponent } from './post-list/post-list.component';

@Component({
  selector: 'app-main-page',
  imports: [PostListComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
