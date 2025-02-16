
/**
 * 
 * Der APP_INITIALIZER wird eingebunden wie folgt:
 * 
 * 1. importieren von AppInitService (auch in "providers[]")
 * 2. Erstellen der function initializeApp1
 * 3. Einbinden im provider :  { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true },
 * 
 * 
 * Es können weitere Initialisierungen eingebunden werden
 * Eine Vorlage findest Du in der Funktion "Init2"
 * In diesem Fall wird die neue Funktion dann in "initializeApp1" integriert ( Aufruf geschachtelt im .then()   )
.
.
.   BEISPIEL::
import { AppInitService } from './app-init.service'; 
.
.
.

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.LoadConfig().then(() => {
      return appInitService.checklicense(['we_terminplaner'])
    }
    )
  }
}


  providers: [
   AppInitService,

   { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true },

  ]


 * 
 */


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbconfigService } from './dbconfig.service';
import  * as customlib  from '../custom/customlib';




@Injectable()
export class AppInitService {

  constructor(private http: HttpClient, private config: DbconfigService) {
  }




  Init1() {
    //Demofunktion1 (dient als Vorlage für weitere Inits)
    return new Promise<void>((resolve, reject) => {
      console.info("Init1 START");
      setTimeout(() => {
        console.info('Init1 FERTIG......');
        resolve();
      }, 200);
    });
  }



  LoadConfig() {
    //Laden der Konfigurationsdatei
    return new Promise<void>((resolve, reject) => {
      this.http.get('./config/config.json').subscribe(res => {
        this.config.url = '/dataapi/index.php';
        this.config.configuration = res
        this.config.configuration.url = this.config.url
        console.info("Config:", this.config.configuration);
        resolve();
      })
    });
  }


  checklicense(modul: any[]) {
    //Einlesen der Lizenzen
    return new Promise<void>((resolve, reject) => {
      let nonce = customlib.randStr();
      let licfile = '/dataapi/bin/Webservices.exe/checklicense?nonce=' + nonce;
      this.http.get(licfile, { responseType: 'text' })
        .subscribe({
          next: (data) => {
            try {
              
              let License = customlib.validateLicense(nonce, data)
              let valid = License.valid;


              //Lizenzinfo in config übertragen:
              License.licenses = JSON.parse(License.licenses) //License.licenses ist das Array aller verfügbaren Lizenzen
              this.config.configuration.license = License;
              this.config.configuration.license.exp = new Date(this.config.configuration.license.exp * 1000);
              this.config.configuration.firmenname = License.kunde;
              this.config.configuration.firmenname_kurz = License.sub;
              modul.forEach(element => {
                let lic = License.licenses.module.find(e => { return String(e.modul).toUpperCase() == element.toUpperCase() })
                if (lic == undefined) {
                  this.config.configuration.licenseerror = 'Lizenz -' + element + '- ist nicht vorhanden';
                  valid = false
                }
                else
                  valid = valid && ((!lic.bis) || (new Date(lic.bis) >= new Date()))

              });
              this.config.configuration.valid = valid;  // config.configuration wird im AUTHGUARD abgefragt, Wenn False -> routing zu Seite "expired"


              resolve()
            } catch (e) {
              if (this.config.configuration) {
                this.config.configuration.valid = false;
                this.config.configuration.licenseerror = data;
              }
              resolve()
            }
          },
          error: (e) => {
            console.error('Fehler beim Lesen der Lizenzdatei', e)
            resolve()
          },
        })
    });
  }


















}