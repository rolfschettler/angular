import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibService {

  constructor() { }

   public sayHallo(){
    return 'Hallo from lib!';
  }
}
