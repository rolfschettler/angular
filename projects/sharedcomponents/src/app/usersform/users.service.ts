import { UidService } from 'lib';
import moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { DbconfigService } from 'lib';




@Injectable({
  providedIn: 'root'
})



export class UsersService {

  constructor( private http:HttpClient,private config:DbconfigService,private uidService:UidService) { }

  getUser(id) {
    return this._getUser(id).pipe(map(res => {
      if (res['data'][0])
        return res['data'][0]
      else
        return new User; //Wenn kein User gefunden, Leeren Datensatz zurückgeben

    }));
  }


  _getUser(id) {
    //Liest einen einzelnen Benutzer ein
    let param = "?operation=encselect";
    let sql = {
      sql: 'YIHt1Mv/V4OQsUam.p0DIRFN97HCP0Q7rT1CG4FZwXAG5aq55EREJjBpIlGQ=.0h07gFXqvGXRvtR1sOhx4w==',
      //##sql'Select * from users where id=:id'
      params: { id: id }
    };
    return this.http.post<any>(this.config.url + param, sql);
  }





  _saveUser(user) {
    return this._saveUser(user);
  }

  saveUser(usr: User): Observable<any> {
    //Speichert einen Benutzer (Insert UND Update)
    let param = "?operation=updateuser&table=users&key=id";
    if (!usr.id) {
      usr.id = this.uidService.uid();
      usr.erstellungsdatum = moment().format();
      param = "?operation=insertuser&table=users";
    }
    let json = JSON.parse(JSON.stringify(usr));
    return this.http.post(this.config.url + param, json)
  }



}
