import { User } from './../classes/user';
import { DbconfigService } from './dbconfig.service';
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'; //npm install --save @auth0/angular-jwt


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject = new BehaviorSubject<User>(this.emptyUser());
  public currentUser: Observable<User>;

  public LoggedinUserSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public Loggedin: Observable<boolean>;


  constructor(private http: HttpClient, private config: DbconfigService) {
    this.currentUser = this.currentUserSubject.asObservable();
    this.Loggedin = this.LoggedinUserSubject.asObservable();

  }


  /*
  Um in einer Komponente die Berechtigung abzufragen :
  1. Importieren von AuthenticationService
  2. Im Constructorparameter anmelden
  3. Folgender Aufruf im ngOnInit Bsp.:

      ngOnInit() {
        this.authenticationService.currentUser.subscribe(user => { this.isadmin = user.rechte.administrator})
      }
  */


  //WICHTIG: muss EINMAL bei der Initialisierung der APP aufgerufen werden
  //Liest alle Benutzerinformationen für die aktuelle Session anhand des JWT-Tokens ein

  public Init() {
    this.getUserFromToken(this.getToken()).subscribe(
      user => {
        this.currentUserSubject.next(user);
      }
    )
  }




  emptyUser() {
    let user = new User;
    user.rechte = JSON.parse(user.rechte);
    return user
  }

  //Wird nur im AuthGuard für die Prüfung der Role benötigt
  //Liest die notwendigen Benutzerinfos (falls noch nicht vorhanden) aus der Datenbank
  public current_User(): Observable<User> {
    return this.currentUser.pipe(mergeMap(res => {
      if (!res.id) {
        return this.getUserFromToken(this.getToken())
      } else {
        return of(res);
      }
    }))
  }
 


  public getToken() {
    if (localStorage.getItem('token'))
      return localStorage.getItem('token')
    else
      return '';
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const helper = new JwtHelperService();//https://github.com/auth0/angular2-jwt
    if (!token)
      return false;
    return !helper.isTokenExpired(token);
  }







  getUserFromToken(token): Observable<User> {
    const helper = new JwtHelperService();//https://github.com/auth0/angular2-jwt
    let id = 0;
console.log(token)
    if (!token)
      return of(this.emptyUser());//Leeres UserObject
    id = helper.decodeToken(token).id;

console.log(helper.decodeToken(token));    
    let param = "?operation=getuserinfo";
    let queryurl = this.config.url + param;
    let data = { 'id': id }
console.log('data:',data,'queryurl:',queryurl);    

//Abgelaufener Token:
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjAwMDAwMDAwMDAiLCJleHAiOjE3NDA4OTU1OTB9.4AaGSbFXkbW8nISJ1qVQcTx-kthLQiBDlx0-dvhL16s


/*
    return this.http.post<User>(queryurl, data).pipe(
      map(res => {
        console.log(res)

        if (!res['data'][0]) {
          //User ist nicht mehr vorhanden, obwohl ein gültiges Token gesetzt. (Zwischenzeitlich aus der Datenbank gelöscht...)
          localStorage.removeItem('token'); //Token entfernen
          this.currentUserSubject.next(this.emptyUser()); //Leeren User an CurrentUser zurückgeben
          this.LoggedinUserSubject.next(false); //Login=false
          return (this.emptyUser()) //Leeren User als Ergebnis
        }
        if (res['data'][0].rechte)
          res['data'][0].rechte = JSON.parse(res['data'][0].rechte);
        else
          res['data'][0].rechte = {};

        this.currentUserSubject.next(res['data'][0])
        return res['data'][0];
      })
    )
*/


    return this.http.post<User>(queryurl, data).pipe(map(
      res => {
        console.log(res)

        if (!res['data'][0]) {
          //User ist nicht mehr vorhanden, obwohl ein gültiges Token gesetzt. (Zwischenzeitlich aus der Datenbank gelöscht...)
          localStorage.removeItem('token'); //Token entfernen
          this.currentUserSubject.next(this.emptyUser()); //Leeren User an CurrentUser zurückgeben
          this.LoggedinUserSubject.next(false); //Login=false
          return (this.emptyUser()) //Leeren User als Ergebnis
        }
        if (res['data'][0].rechte)
          res['data'][0].rechte = JSON.parse(res['data'][0].rechte);
        else
          res['data'][0].rechte = {};

        this.currentUserSubject.next(res['data'][0])
        return res['data'][0];



      }),
      catchError(error => {
          //Hier wird ein Fehler behandelt, der beim Versuch entsteht, die tabelle users zu lesen. (z.B. "Token expired")
          console.log(error)
          
        return (of(null))
      }
      ))





  }


  getNewToken(email, password, anonymous: any = null): Observable<any> {
    let param = "?operation=authenticate";
    let content = { email: email, password: password };
    if (anonymous)
      content = anonymous; //Wenn ein Anonymes Login!
    let data = JSON.stringify(content);
    data = JSON.parse(data);

    let queryurl = this.config.url + param;
    return this.http.post<any>(queryurl, data)
      .pipe(map(result => {
        if (result) {

          localStorage.setItem('token', result['data'])
          return result['data'];
        } else {
          return null;
        }
      }))
  }



  doLogin(email, password, anonymous: any = null): Observable<any> {
    return this.getNewToken(email, password, anonymous).pipe(mergeMap(res => {




      this.LoggedinUserSubject.next(res !== null);
      if (!anonymous){
        return this.getUserFromToken(res)
      }
      else{
        if(res){
        const helper = new JwtHelperService();//https://github.com/auth0/angular2-jwt

        let data = helper.decodeToken(res).data;

        

        return of(data);//wenn Anonym, dann DATA-Object
        }else{
          return of({id:null})
        }
      }
    }
    ))
  }

  doLogout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(this.emptyUser());
    this.LoggedinUserSubject.next(false);
  }





}
