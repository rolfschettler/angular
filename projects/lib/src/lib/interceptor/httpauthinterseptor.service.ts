import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthenticationService } from './../common/authentication.service';

import { inject } from '@angular/core';


// https://angular.dev/api/common/http/HttpInterceptorFn

export const authenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authenticationService = inject(AuthenticationService);
  const userToken = authenticationService.getToken();

  console.log('token', userToken);

  //  const modifiedReq = req.clone({
  //    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  //  });

  const modifiedReq = req.clone({
    setHeaders: {
      Accept: 'text/html, application/xhtml+xml, */*',
      ContentType: 'application/x-www-form-urlencoded',
      Authorization: userToken,
    },
  });

  return next(modifiedReq);
};
