import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UidService {

  constructor() { }

  uid() {

  //ACHTUNG : JAHR 2059 GGF. 1.Teil ERWEITERN, ÜBERLAUF!
   return (Date.now().toString(36)+ '-'+ Math.random().toString(36).substring(2, 7)).toUpperCase();
   
   
  }


}
