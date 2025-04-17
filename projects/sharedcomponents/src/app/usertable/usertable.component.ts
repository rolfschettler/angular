import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, DbconfigService, DialogService } from 'lib';
import { map, Observable } from 'rxjs';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';

@Component({
  selector: 'shared-usertable',

  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.scss'
})
export class UsertableComponent implements OnInit {

  users: Observable<any>
  selectedId: string = null;



  ngOnInit(): void {
    this.users = this.getUsers();
  }

  config = inject(DbconfigService);
  http = inject(HttpClient)

  route = inject(ActivatedRoute)
  router = inject(Router);
  dialogservice = inject(DialogService)
  alertservice = inject(AlertService)




  deleteUser(id) {
    this.dialogservice.YesNoDialog('Soll dieser Benutzer wirklich gelöscht werden ?').subscribe(antwort => {
      if (antwort) {
        this.do_deleteUser(id).subscribe(res => {
          if (res?.status === 'OK') {
            this.users = this.getUsers();
            this.alertservice.success('Der Benutzer wurde gelöscht', false, 2000)
          }

        });
      }
    })
  }
  do_deleteUser(id) {
    //Löscht einen Benutzer
    let param = "?operation=encdelete";
    let sql = {
      sql: 'rp4WqI4PA+FZ3bbT.IRpGKlPx+ZAh3RYjr04FZFST3XpA4xPQFc0F6cmK.yLJI7kVgYBTM9ymMHYMrwA==',
      //##sql'Delete from users where id=:id'
      params: { id: id }
    }
    return this.http.post<any>(this.config.url + param, sql);
  }



  gotoUserId(id) {
    this.router.navigate(['/user', id]);
  }


  newUser() {
    this.router.navigate(['/user', '']);
  }




  getUsers(): Observable<any[]> {
    //Liest alle Benutzer ein
    let param = "?operation=encselect";
    let sql = {
      sql: 'a0hxHsL3X7hCZACm.JRapMn/IXR6R78JrJ94+WZKtlWz8FnTjHhR55Qi0Jowr+bwEXA==.kZAp5Fn3yyT1I/zOEIp0aA=='
      //##sql'Select * from users order by username'
    };
    return this.http.post<any>(this.config.url + param, sql).pipe(map(res => {
      res['data'].forEach(element => {
        //Erzeugt ein neues berechnetes Feld : "userrechte" (Json der Rechte)
        element.userrechte = JSON.parse(element.rechte)
      });

      return res['data']
    }))
  }




}
