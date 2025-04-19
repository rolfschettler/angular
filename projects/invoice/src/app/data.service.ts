import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { DbconfigService, UidService } from 'lib';
import { HttpClient } from '@angular/common/http';

import moment from 'moment';

@Injectable({
  providedIn: 'root',
  
})
export class DataService {


  constructor(
    private http: HttpClient,
    private config: DbconfigService,
    private uidService:UidService

  ) { }

/**
 * 
 * Hinweis :
 * Um eine SELECT, UPDATE ODER DELETE Abfrage an die API zu senden, muss der SQL-String verschlüsselt werden
 * 
 * 
 */




getUsers() {
  let param = "?operation=encselect";
  let sql={ 
    sql:'X0OgV+tB6P6RMZVF.zkLJ1wQe56lw8x2tdEAwZYHHPec=.OQ3m1o9LAZXBZB0AfxQavQ==',
    /* ##sql'select * from users' */
    params:{}
  }
  
  return this.http.post<any>( this.config.url + param, sql)

}





saveUser(usr: any): Observable<any> {
  //Speichert einen Benutzer (Insert UND Update)
  let param = "?operation=insert&table=users&key=id";
  let json = JSON.parse(JSON.stringify(usr));
  return this.http.post(this.config.url + param, json)
}




}
