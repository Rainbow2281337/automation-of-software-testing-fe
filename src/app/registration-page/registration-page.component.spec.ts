import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationPageComponent } from './registration-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserPayload } from '../auth-page/shared/interface';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegistrationPageComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.regForm).toBeDefined();
    expect(component.regForm.value).toEqual({
      email: null,
      userName: null,
      password: null,
    });
  });

  it('should mark form as invalid when empty', () => {
    expect(component.regForm.invalid).toBeTrue();
  });

  it('should mark form as valid when filled correctly', () => {
    component.regForm.setValue({
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password123',
    });

    expect(component.regForm.valid).toBeTrue();
  });

  describe('emitRegistration', () => {
    it('should call AuthService register method on valid form submission', () => {
      component.regForm.setValue({
        email: 'test@example.com',
        userName: 'testuser',
        password: 'password123',
      });

      const mockResponse: UserPayload = {
        payload: {
          email: 'test@example.com',
          userName: 'testuser',
        },
        access_token: 'mockToken',
      };
      authServiceSpy.register.and.returnValue(of(mockResponse));

      component.emitRegistration(new Event('submit'));
      expect(authServiceSpy.register).toHaveBeenCalledWith(
        'test@example.com',
        'testuser',
        'password123'
      );
    });

    it('should handle registration error correctly', () => {
      spyOn(console, 'error');
      component.regForm.setValue({
        email: 'test@example.com',
        userName: 'testuser',
        password: 'password123',
      });
      const mockError = new Error('Registration failed');

      authServiceSpy.register.and.returnValue(throwError(() => mockError));

      component.emitRegistration(new Event('submit'));
      expect(console.error).toHaveBeenCalledWith('Error:', mockError);
    });
  });
});
