import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router, private snackBar: MatSnackBar) {
    // clear alert message on route change
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next(null);
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false, timeout = 0) {
    this.snackBar.open(message, 'Schließen', {
        duration: timeout,
        panelClass: ['success-snackbar'],
      });
  }

  error(message: string, keepAfterNavigationChange = false, timeout = 0) {
    this.snackBar.open(message, 'Schließen', {
      duration: timeout,
      panelClass: ['error-snackbar'],
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}

// Snackbar-Fehlermeldung anzeigen
// snackBar.open(message, 'Schließen', {
//   duration: 5000,
//   panelClass: ['error-snackbar'],
// });
