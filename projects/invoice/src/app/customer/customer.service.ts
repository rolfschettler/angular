
import { map, Observable, of } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { DbconfigService,UidService } from 'lib';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

   constructor() { }


   config= inject(DbconfigService)
   http =inject(HttpClient)  
   uidService=inject(UidService)
  

  getRecord(id) {
    let param = "?operation=encselect";
    let sql={ 
      sql:'k1P9X2uGBtB0YiQJ.FilHvRRU7tEP5hNaVGLkZA2rwAV9tcwL4CBi3oZYnmzZIV3K.9AtPsXXnSvn/sOME31+gxg==',
      /* ##sql'select * from customer where id=:id' */
      params: { id: id }
    }
    return this.http.post<any>(this.config.url + param, sql).pipe(
      map(
        res => {
          let record = res['data'][0];
          if (record) {
	      				
	   
          }
          return record
        }
      )

    )
  }



  saveRecord(record, table): Observable<any> {
    let param = "?operation=update&table=" + table + "&key=id";
    if (!record.id) {
      record.id = this.uidService.uid();
      param = "?operation=insert&table=" + table;
    }
    let json = JSON.parse(JSON.stringify(record));
    return this.http.post(this.config.url + param, json)
  }






}

