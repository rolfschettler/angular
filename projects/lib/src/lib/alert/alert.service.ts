import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;


    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
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
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
        if (timeout > 0) {
            setTimeout(() => {
                this.subject.next(null);
            }, timeout);
        }
    }

    error(message: string, keepAfterNavigationChange = false, timeout = 0) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
        if (timeout > 0) {
            setTimeout(() => {
                this.subject.next(null);
            }, timeout);
        }




    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}