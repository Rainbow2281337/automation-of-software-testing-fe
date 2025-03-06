import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/shared/interfaces/user.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-button',
  imports: [],
  templateUrl: './profile-button.component.html',
  styleUrl: './profile-button.component.scss',
})
export class ProfileButtonComponent {
  /**
   * Indicates if the profile button has been clicked or not.
   *
   * @memberof ProfileButtonComponent
   */
  public clicked: boolean = false;

  /**
   * User info.
   *
   *
   * @memberof ProfileButtonComponent
   */
  user!: User;

  private destroySub$ = new Subject<void>();

  constructor(private readonly userService: UserService) {}

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  /**
   * Sets the clicked property to true or false and fetches the user data.
   *
   * @memberof ProfileButtonComponent
   */
  openUserInfo(): void {
    this.clicked = !this.clicked;
    this.destroySubscriptions();
    this.destroySub$ = new Subject<void>();

    const userEmail = localStorage.getItem('email') ?? '';

    if (this.clicked) {
      this.userService.getUserDataByEmail(userEmail).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
    }
  }

  private destroySubscriptions() {
    this.destroySub$.next();
    this.destroySub$.complete();
  }
}
