import { DialogService } from './../shared/dialogs/dialog.service';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { DbconfigService, DialogService } from 'al-lib';
import { of } from 'rxjs';
import { DbconfigService } from './dbconfig.service';


@Injectable({
  providedIn: 'root'
})
export class KIService {

  constructor(
    private config: DbconfigService,
    private http: HttpClient,
    private dialogService: DialogService
  ) { }




  KIRequest(request: string, maxtoken: number = null) {
    let param = '?operation=getChatGTP';
    //let enctoken = 'yVmEvpzpNbDv9eDP.uae88NTsLsWCrB6K2pfB6PntpT/rP5Nugl58LDMwFN4b249ITuWpvqEYPQgOQgKSs2ryFP8=.amuuMwLKj61PneYtNzy2Cw==';

    //Neuer Token:
    let enctoken ='0TzfI2O7mYkhS5my.1SyYAlsXOXMX+5csg4GIz8jLMSXI0qlnGkTdZ0ZsUHFS2+lRr36h+NODm+tcU41OGEG9jmBu/5ZisUnBnxV9jOFbPnT+gXUNzJ77BQrUvxtGnfRpcvyg7jqiRG3+zxv6+zZbdL8eb77YeKdPFNeICa/v2NL2owHN8Va6oh1OoWyc9ZEjofs6GgGIum6PbT9HuOOxUS2xqUTMcc7m.35AjvTuQLgOPLcda1Cpn4w==';



    let sql;
    if (maxtoken)
      sql = JSON.parse(JSON.stringify({ token: enctoken, request: request, maxtoken: maxtoken }));
    else
      sql = JSON.parse(JSON.stringify({ token: enctoken, request: request }));

    return this.http.post<any>(this.config.url + param, sql).pipe(map(
      res => {
        if (res.status !== 'OK')
          this.dialogService.confirm('Es ist ein Fehler aufgetreten. ' + res.status)
        return res

      }),
      catchError(error => {
        if (String(error).includes('Zeitlimit'))
          this.dialogService.confirm('Die Anfrage konnte derzeit nicht ausgeführt werden. Versuchen Sie es bitte etwas später erneut.')
        else
          this.dialogService.confirm('Es ist ein Fehler aufgetreten. ' + error)
        return of({ status: error })
      }
      ))




  }
}