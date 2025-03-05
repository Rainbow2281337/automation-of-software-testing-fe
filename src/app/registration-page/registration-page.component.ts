import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent implements OnInit {
  /**
   * The registration data of the {@link FormGroup}
   */
  public regForm!: FormGroup;

  /**
   * Indicates if the register button was clicked
   *
   *  @memberof AuthPageComponent
   */
  public submitted: boolean = false;

  constructor(private readonly authSerice: AuthService) {}

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

  emitRegistration(event: Event) {
    event.preventDefault();
    this.submitted = true;

    if (this.regForm.invalid) {
      return;
    }
    const { email, userName, password } = this.regForm.value;

    this.authSerice.register(email, userName, password).subscribe({
      next: (response) => {
        console.log(response); // TODO: REMOVE THIS LINE
      },
      error: (error) => {
        console.error('Error:', error); // TODO: REPALCE WITH ERROR HANDLER
      },
    });
  }
}
