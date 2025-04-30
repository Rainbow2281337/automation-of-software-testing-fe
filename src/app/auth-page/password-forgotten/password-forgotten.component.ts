import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/shared/interfaces/user.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-forgotten',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.scss',
})
export class PasswordForgottenComponent implements OnInit {
  /**
   * The data of the {@link FormGroup}
   *
   * @memberof PasswordForgottenComponent
   */
  form!: FormGroup;

  /**
   * Indicates if the form was submitted
   *
   * @memberof PasswordForgottenComponent
   */
  public submitted: boolean = false;

  /**
   * Indicates if the user was found
   *
   * @memberof PasswordForgottenComponent
   */
  isUserFound: boolean = false;

  /**
   * The user data to store
   *
   * @memberof PasswordForgottenComponent
   */
  user: User | null = null;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null),
    });
  }

  /**
   * Finds a user by email
   *
   * @param event - The event to prevent the default behavior
   * @memberof PasswordForgottenComponent
   */
  findUserByEmail(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (!this.isUserFound) {
      if (this.form.controls['email'].valid) {
        this.userService.getUserDataByEmail(this.form.value.email).subscribe({
          next: (user) => {
            this.user = user;
            this.isUserFound = true;
            this.form
              .get('newPassword')
              ?.setValidators([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
              ]);
            this.form.get('newPassword')?.updateValueAndValidity();
          },
          error: (error) => {
            console.error(error);
            this.isUserFound = false;
          },
        });
      }
    }
  }

  /**
   * Checks if the form is valid and the user was found, then emits the new password
   *
   * @param event - The event to emit the new password
   * @memberof PasswordForgottenComponent
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitNewPassword(event: Event) {
    if (this.form.valid && this.submitted && this.isUserFound) {
      this.userService
        .updateUser(this.user!._id, {
          password: this.form.value.newPassword,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/auth']);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
