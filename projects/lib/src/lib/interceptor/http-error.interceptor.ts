import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AlertService } from '../alert/alert.service';


export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const alertservice = inject(AlertService);

  return next(req).pipe(
    catchError((err) => {
      console.error('FEHLERBERICHT, Http-Interceptor', err);
      let status = err.status;
      let message = err.error;
      let statustext = err.statusText;
      let url = err.url;

      if (err.status === 401) {
        // Authentifizierung fehlgeschlagen
        if (err.error.toString() === '[object Blob]')
          alertservice.error('Keine Berechtigung...');
        else {
          //Snackbar-Fehlermeldung anzeigen

          if (String(message).includes('Bitte neu anmelden')) {
            
           
            snackBar.open('Ihre Anmeldungung ist abgelaufen, Bitte neu anmelden', 'Schließen', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
             router.navigate(['login']);
          } else {
            alertservice.error(message);
            return throwError(() => new Error(message)); //Fehler wird weiter gereicht
          }
        }
        return EMPTY;
      }

      if (err.error instanceof ErrorEvent) {
        message = `Client-Fehler: ${err.error.message}`;
      } else {
        switch (status) {
          case 200:
            if (String(err.error.text).includes('Maximum execution time'))
              return throwError(() => new Error('Zeitlimit überschritten')); //Fehler wird weiter gereicht
            break;

          case 400:
            //Allgemeiner Fehler DBOperation: Select / Update / Insert / Delete
            alertservice.error(message, false, 7000);
            break;

          case 404: {
            alertservice.error('Seite nicht gefunden: ' + url, false, 7000);
            break;
          }
          case 409: {
            //Eine vom Server gesendete Nachricht, die einen Integritätskonflikt enthält
            return throwError(() => new Error(message)); //Fehler wird weiter gereicht
            break;
          }
          case 500:
            alertservice.error(statustext, false, 7000);
            return throwError(() => new Error(statustext)); //Fehler wird weiter gereicht
            break;
          case 503:
            //Verbindunsproblem DB-Connect
            alertservice.error(message);
            break;
          default: {
            if (status === 0)
              alertservice.error(
                'Verbindung fehlgeschlagen. Versuchen Sie es bitte später wieder.  -  (' +
                  err.message +
                  ')',
                false,
                7000
              );
            else
              alertservice.error(
                'Fehler:  -  (' + err.message + ')',
                false,
                7000
              );
          }
        }
      }

      // Snackbar-Fehlermeldung anzeigen
      // snackBar.open(message, 'Schließen', {
      //   duration: 5000,
      //   panelClass: ['error-snackbar'],
      // });
      return EMPTY;
    })
  );
};
