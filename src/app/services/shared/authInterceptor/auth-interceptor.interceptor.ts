import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  if (
    req.method === 'PUT' ||
    req.url.includes('/register') ||
    req.url.includes('/login') ||
    req.url.includes('/user/email')
  ) {
    return next(req);
  }
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq);
};
