import { DbconfigService } from 'lib';


import { HttpClient } from '@angular/common/http';
// https://www.netjstech.com/2020/11/custom-async-validator-angular-reactive-form.html

import { Injectable, Component } from '@angular/core';
import { AbstractControl, AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';








@Injectable({ providedIn: 'root' })
export class MailValidator implements AsyncValidator {
    //Prüft, ob die angegebene EMail bereits vorhanden ist
    constructor(private http: HttpClient, private config: DbconfigService) { }
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

        return this.checkEmailExits(control).pipe(
            map(result => (result ? null : { AllreadyExists: true })),
            catchError(() => of(null))
        );
    }

    //HTTP-Service
    checkEmailExits(control: AbstractControl): Observable<boolean> {
        //control ist das Eingabefeld
        //control.parent ist die Form
        let email = control.value;
        email = String(email).toLowerCase();
        let id = control.parent.get('id').value;
        if (email == "") {
            return of(true)
        }
        let param = "?operation=encselect";

        let sql1 = {
            sql: '4CpiJP9Stdjw/0fD.oArTpku7Jw40wkJuGChCblsjBkjeA12AJ16LbgP6nXc9/kjREJX3RKG2ee7QKtjr+w+2Jynzj61d.hb3vJ9cX7QUK8rUzthtbiA==',
            //##sql'Select * from users where LOWER(email)=:email and id<>:id'
            params: { email: email, id: id }
        }

        let sql2 = {
            sql: 'kM8tJ4pGzgpQNBSL.9o3vyd3FG6jEZpKtTJQGVlNFlHKwiZuhqCxEKsQAyUP3tQaaIPDup1Nyw+1i.2+RSDlfGDDvqHPWAeZbADA==',
            //##sql'Select * from users where LOWER(email)=:email'
            params: { email: email }
        }

        let sql = null;
        if (id)
            sql = sql1;
        else
            sql = sql2;

        return this.http.post<any>(this.config.url + param, sql).pipe(
            map(
                res => {
                    if (res['data'].length == 0) {
                        return true
                    }
                    return false

                }
            )
        )
    }


}