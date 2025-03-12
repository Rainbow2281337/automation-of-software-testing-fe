import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { UserPayload } from '../../auth-page/shared/interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should send login request and save email and token in the local storage', () => {
      const email: string = 'test@gmail.com';
      const password: string = 'password123';
      const userName = 'testUserName';
      const mockResponse: UserPayload = {
        access_token: 'test_token',
        payload: {
          email: email,
          userName: userName,
        },
      };

      spyOn(localStorage, 'setItem');

      service.login(email, password).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'auth_token',
          mockResponse.access_token
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'email',
          mockResponse.payload.email
        );
      });
      const req = httpMock.expectOne('http://localhost:5000/auth/login');

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: email, password: password });
      req.flush(mockResponse);
    });

    it('should throw an error if the request fails', () => {
      const email: string = 'wrongEmail@gmail.com';
      const password: string = 'wrongPassword123';
      const errorResponse = {
        message: 'User not found',
        error: 'Bad Request',
        statusCode: 400,
      };

      service.login(email, password).subscribe({
        next: () => {
          fail('Expected an error, but got a response');
        },
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
          expect(error.error).toEqual(errorResponse);
        },
      });
      const req = httpMock.expectOne('http://localhost:5000/auth/login');

      expect(req.request.method).toBe('POST');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('register', () => {
    it('should send register request and save token in the local storage', () => {
      const email: string = 'test@gmail.com';
      const userName = 'testUserName';
      const password: string = 'password123';
      const mockResponse: UserPayload = {
        access_token: 'test_token',
        payload: {
          email: email,
          userName: userName,
        },
      };

      spyOn(localStorage, 'setItem');

      service.register(email, userName, password).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'auth_token',
          mockResponse.access_token
        );
      });
      const req = httpMock.expectOne('http://localhost:5000/auth/register');

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        email: email,
        userName: userName,
        password: password,
      });
      req.flush(mockResponse);
    });

    it('should throw an error if the email is already taken', () => {
      const email: string = 'alreadyTakenEmail@gmail.com';
      const userName = 'testUserName';
      const password: string = 'password123';
      const errorResponse = {
        code: '0001',
        message: 'User with the same email is already exists',
      };

      service.register(email, userName, password).subscribe({
        next: () => {
          fail('Expected an error, but got a response');
        },
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
          expect(error.error).toEqual(errorResponse);
        },
      });
      const req = httpMock.expectOne('http://localhost:5000/auth/register');

      expect(req.request.method).toBe('POST');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    });

    it('should throw an error if the password is less than 6 characters', () => {
      const email: string = 'test@gmail.com';
      const userName = 'testUserName';
      const password: string = 'pass';
      const errorResponse = {
        message: ['password must be longer than or equal to 6 characters'],
        error: 'Bad Request',
        statusCode: 400,
      };

      service.register(email, userName, password).subscribe({
        next: () => {
          fail('Expected an error, but got a response');
        },
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toBe('Bad Request');
          expect(error.error).toEqual(errorResponse);
        },
      });
      const req = httpMock.expectOne('http://localhost:5000/auth/register');

      expect(req.request.method).toBe('POST');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    });
  });
});
