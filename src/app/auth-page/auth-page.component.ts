import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  /**
   * The login data of the {@link FormGroup}
   *
   * @memberof AuthPageComponent
   */
  public loginForm!: FormGroup;

  /**
   * Indicates if the login button was clicked
   *
   *  @memberof AuthPageComponent
   */
  public submitted: boolean = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }

  /**
   * Emits the login data from the form
   *
   * @param {Event} event The event that was triggered
   * @memberof AuthPageComponent
   */
  emitLogin(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Response:', response); // TODO: REMOVE THIS LINE
      },
      error: (error) => {
        console.error('Error:', error); // TODO: REPALCE WITH ERROR HANDLER
      },
    });
  }
}
