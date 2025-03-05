import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent implements OnInit {
  /**
   * The registration data of the {@link FormGroup}
   *
   * @memberof AuthPageComponent
   */
  public regForm!: FormGroup;

  /**
   * Indicates if the register button was clicked
   *
   *  @memberof AuthPageComponent
   */
  public submitted: boolean = false;

  constructor(
    private readonly authSerice: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.regForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }

  /**
   * Emits the registration data from the form
   *
   * @param {Event} event The event that was triggered
   * @memberof AuthPageComponent
   */
  emitRegistration(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (this.regForm.invalid) {
      return;
    }
    const { email, userName, password } = this.regForm.value;

    this.authSerice.register(email, userName, password).subscribe({
      next: (response) => {
        if (response?.access_token) {
          this.router.navigate(['/main']);
        }
      },
      error: (error) => {
        console.error('Error:', error); // TODO: REPALCE WITH ERROR HANDLER
      },
    });
  }
}
