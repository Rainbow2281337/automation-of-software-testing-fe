import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-post-button',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-post-button.component.html',
  styleUrl: './add-post-button.component.scss',
})
export class AddPostButtonComponent implements OnInit {
  /**
   * Indicates if the add post button has been clicked.
   *
   * @memberof AddPostButtonComponent
   */
  public clicked: boolean = false;

  /**
   * The new post data of the {@link FormGroup}
   *
   * @memberof AddPostButtonComponent
   */
  formNewPost!: FormGroup;

  private destroySub$ = new Subject<void>();

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.formNewPost = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  /**
   * Sets the clicked property to true to open the modal
   *
   * @memberof AddPostButtonComponent
   */
  openModal() {
    this.clicked = true;
  }

  /**
   * Sets the clicked property to false to close the modal
   *
   * @memberof AddPostButtonComponent
   */
  closeModal() {
    this.clicked = false;
  }

  addNewPost(event: Event) {
    event.preventDefault();
    this.destroySubscriptions();
    this.destroySub$ = new Subject<void>();

    if (this.formNewPost.invalid) {
      return;
    }
    const { title, content } = this.formNewPost.value;

    this.postService.addPost(title, content).subscribe({
      next: (response) => {
        if (response) {
          this.closeModal();
        }
      },
      error: (error) => {
        console.error('Error:', error); // TODO: REPALCE WITH ERROR HANDLER
      },
    });
  }

  private destroySubscriptions() {
    this.destroySub$.next();
    this.destroySub$.complete();
  }
}
