import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DatabaseService } from './../database.service';
import { Injectable } from '@angular/core';
import { User } from '../db-structure/user';




@Injectable({
  providedIn: 'root'
})



export class UsersService {

  constructor(private databaseService: DatabaseService) { }

  getUser(id) {
    return this.databaseService.getUser(id).pipe(map(res => {
      if (res['data'][0])
        return res['data'][0]
      else
        return new User; //Wenn kein User gefunden, Leeren Datensatz zurückgeben

    }));
  }

  saveUser(user) {
    return this.databaseService.saveUser(user);
  }


}
