import { AlertService } from '../alert/alert.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { EMPTY } from 'rxjs';


@Injectable()
export class HTTPErrorInterceptorService implements HttpInterceptor {

  constructor(private alertService: AlertService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    return next.handle(request).pipe(catchError(err => {



      console.error('FEHLERBERICHT, Http-Interceptor', err);
      let status = err.status;
      let message = err.error;
      let statustext = err.statusText;
      let url = err.url;


      if (err.status === 401) {
        // Authentifizierung fehlgeschlagen
        //this.authenticationService.logout();
        //location.reload(true);

        //this.messageService.addWarning(message);
        if (err.error.toString() === '[object Blob]')
          this.alertService.error('Keine Berechtigung...')
        else
          this.alertService.error(message);

        return EMPTY;

      }

      switch (status) {
        case 0: {
          if (String(url).includes('hellocloud'))
            return throwError(() => new Error('HelloCloud, Programm nicht erreichbar'));//Fehler wird weiter gereicht
          break;
        }

        case 200: {

          if (String(err.error.text).includes('Maximum execution time'))
            return throwError(() => new Error('Zeitlimit überschritten'));//Fehler wird weiter gereicht
          break;
        }


        case 400: {
          //Allgemeiner Fehler DBOperation: Select / Update / Insert / Delete
          //this.messageService.addWarning(message);
          this.alertService.error(message, false, 7000);
          break;
        }



        case 404: {
          return throwError(err);//Fehler wird weiter gereicht
          //return throwError(() => err) ?????
        }


        case 409: {
          //Eine vom Server gesendete Nachricht, die einen Integritätskonflikt enthält
          //return throwError(message);//Fehlermeldung wird weiter gereicht
          return throwError(() => new Error(message));//Fehler wird weiter gereicht
          break;
        }



        case 500: {
          this.alertService.error(statustext, false, 7000);
          //return throwError(statustext);//Fehler wird weiter gereicht
          return throwError(() => new Error(statustext));//Fehler wird weiter gereicht
          break;
        }




        case 503: {
          //Verbindunsproblem DB-Connect
          //this.messageService.addWarning(message);
          this.alertService.error(message);
          break;
        }

        default: {
          //this.messageService.addWarning("Verbindung fehlgeschlagen. Versuchen Sie es bitte später wieder.  -  (" + err.message + ")");
          if (status === 0)
            this.alertService.error("Verbindung fehlgeschlagen. Versuchen Sie es bitte später wieder.  -  (" + err.message + ")", false, 7000);
          else
            this.alertService.error("Fehler:  -  (" + err.message + ")", false, 7000);


        }
      }
      return EMPTY; //Fehler ist behandelt und wird nicht weitergegeben
    }))
  }
}



