import { DbconfigService } from './dbconfig.service';

import { AlertService } from '../alert/alert.service';


//https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, mergeMap, flatMap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { User } from '../classes/user';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  user: User


  constructor(public authenticationService: AuthenticationService, private router: Router, private alertService: AlertService, private config: DbconfigService) { }




  hasRole(role: any): Observable<boolean> {
    return this.authenticationService.current_User().pipe(
      map(user => {

        //::: "role" kann ein string oder ein Array of strings sein. für ein Array wird überprüft, ob eines der geforderten Rolen in den User-rechten auf true steht.
        //::: user enthält das Feld "rechte". Die zugewiesenen rechte(roles) sind in diesem Textfeld als JSON gespeichert
        var roleok = false;
        let rechte = user['rechte'];


        if (Array.isArray(role)) {

          if (role.indexOf('gast') > -1) {
            roleok = true //Wenn "gast" im Array gefunden wird, OK
          } else {
            role.forEach(element => {
              if (rechte[element]) //Wenn ein Recht aus dem Array in den Rechten vorhanden (true) , dann OK
                roleok = true

            });
          }

        } else {
          roleok = (rechte[role]) || role == 'gast'; //die role "gast" dient dazu, den Benutzer zur Anmeldung zu zwingen, benötigt aber kein Recht für den Benutzer        
        }

        /////////////////////////////////////////////////TODO Prüfen ob ein User GAR keine Rechte hat

        if (!roleok)
          this.alertService.error('Sie verfügen nicht über die notwendige Berechtigung (' + role + ') für diesen Programmteil', false, 4000);
        return roleok;
      })
    )
  }


  canActivate(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    const expectedRole = activatedRoute.data['expectedRole'];
    let activateAllowed = true;

    if (this.config.configuration.valid!==undefined) {
      if (!this.config.configuration.valid) {
        this.router.navigate(['/expired']); //Wenn nicht "configuration.valid" dann, Lizenz nicht OK ==> zur Seite "Expired"
        return false;
      }
    }


    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (expectedRole) {
      return this.hasRole(expectedRole); //return Observable<boolean>
    }

    return activateAllowed;







  }
}
