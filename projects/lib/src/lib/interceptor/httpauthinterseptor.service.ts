import { AuthenticationService } from './../common/authentication.service';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpauthinterseptorService {

  constructor(private authenticationService: AuthenticationService) { }



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method == 'POST') {
      //ACHTUNG ACHTUNG ACHTUNG ACHTUNG ACHTUNG ACHTUNG ACHTUNG : Authorization wird nur und IMMER bei POST durchgeführt (GET DAFR NICHT Authorisiert werden)
 

      request = request.clone({
        setHeaders: {
          Accept: "text/html, application/xhtml+xml, */*",
          ContentType: "application/x-www-form-urlencoded",
          Authorization: this.authenticationService.getToken(),
        }
      });

    }

    return next.handle(request);
  }

}
