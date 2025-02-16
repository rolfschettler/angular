//DIESER SERVICE WIRD INITIALISIERT IN "app.module.ts"


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbconfigService {

  //public url = "http://localhost/restserver/index.php";
  //public url= "http://p559334.webspaceconfig.de/restserver/index.php";

  //public url: string= '/dataapi/index.php';
  public url: string='';
  public url_placeholder = '#URL#';
  public configuration: any;

  constructor() {}


  /**
   * @description
   * Rückgabewert bei gültiger Lizenz ein Leerstring, sonst Fehlergrund.
   */

  checkLicense(modul: string): string {
    //Prüft eine Modul aus der Lizenz auf Gültigkeit
    //Wenn Lizenz gültig Rückgabewert='' sonst-> Fehlermeldung

    let valid = '';
    let module = this.configuration.license?.licenses?.module
    if (!module)
      return valid;

    let searchedmodul = module.find(e => { return String(e.modul).toUpperCase() == modul.toUpperCase() })
    if (searchedmodul == undefined)
      valid = 'NICHT VORHANDEN'
    else {
      if (searchedmodul.bis && (new Date(searchedmodul.bis) < new Date())) {
        valid = 'LIZENZ ABGELAUFEN'
      }
    }

    return valid;
  }

}
