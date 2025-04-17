import sha256 from 'crypto-js/sha256';
import hmac256 from 'crypto-js/hmac-sha256';
import base64url from 'crypto-js/enc-base64url';
import base16 from 'crypto-js/enc-hex';
import utf8 from 'crypto-js/enc-utf8';
import { FormGroup, ValidationErrors } from '@angular/forms';

//Import wie folgt :
//import  * as customlib  from 'al-lib';

//Aufruf Bsp.:
//customlib.gethello();

export function gethello() {
  return 'Hello to all from customlib !';
}




//FUNKTIONEN FÜR DIE BEHANDLUNG VON DECIMAL- UND NUMBER IN FORMs

//Vor dem Speichern in die Datenbank
export function convertToDecimal(n: string): number {
  let s = n.replace(',', '.');
  return Number(parseFloat(s).toFixed(2));
}

//Vor dem initialisieren der "Form"
export function convertToString(n: string): string {
  if (n != 'null') {
    return n.replace('.', ',')
  }
  else {
    return '';
  }
}


//FUNKTIONEN FÜR DIE AUFBEREITUNG VOR DEM SPEICHERN
//gibt als Ergebnis Ein Object zurück, das nur die Propertys enthält, die unterschiedlich sind
//Bereitet einen Datensatz für das Speichern vor.
//Es sind nur noch Felder enthalten, die geändert wurden.(Zusäztlich ist das Feld "id" immer enthalten)
//Wenn noch keine ID vorhanden ist, dann wird der Satz komplett zurückgegeben, da es sich um einen neuen Satz handelt.
//Bsp.: let json = (customlib.extractChanges(new, org));//Nur geänderte Felder werden übertragen.


export function extractChanges(modified, org): any {
  if (!modified['id']) { //Neuer Vorgang
    return modified;
  }

  var rec: { [k: string]: any } = {};
  rec['id'] = modified['id'];
  for (let [key, value] of Object.entries(org)) { //Änderungen erkennen
    if (modified[key] === '') {//Leerstring wird zu null
      modified[key] = null;
    }

    if (modified[key] != value) {
      rec[key] = modified[key];
    }

  }
  return rec;
}


export function replaceAll(originalString, find, replace) {
  return originalString.replace(new RegExp(find, 'g'), replace);
};




export function formatCurrency(s) {
  var formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
  return formatter.format(s); /*Bsp.: 2.500,00 € */
}

export function formatDecimal(s) {
  var formatter = new Intl.NumberFormat('de-DE', {
    style: 'decimal',

  });
  return formatter.format(s); /*Bsp.: 2.500,00  */
}


export function floatToString(n: string): string {
  if (n != 'null') {
    return n.replace('.', ',')
  }
  else {
    return '';
  }
}



/**
    * Funktion um alle Fehlermeldungen einer reactive Form auszulesen
    * Rückgabewert ist ein Array aller Fehlermeldungen für die jeweiligen Controls
    * Benötiget den Import von "FormGroup" und "ValidationErrors"
    * @param form Das Formgroup Object
    * @result result Array of {control,error,value}
    */



export function getFormValidationErrors(form: FormGroup): any[] {
  const result = [];
  //ERROR FOR CONTROLS
  Object.keys(form.controls).forEach(key => {
    const controlErrors: ValidationErrors = form.get(key).errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          'control': key,
          'error': keyError,
          'value': controlErrors[keyError]
        });
      });
    }
  });

  //ERROR FOR FORMGROUP
  const controlErrors: ValidationErrors = form.errors;
  if (controlErrors) {
    Object.keys(controlErrors).forEach(keyError => {
      result.push({
        'control': form,
        'error': keyError,
        'value': controlErrors[keyError]
      });
    });
  }

  return result;
}




/**
    * Rückgabe: Das Alter in Jahren und Monaten
    *  @param DATEBIRTH Das Geburtsdatun
    *  @param DATEREF Das Referenzdatum zu dem das Alter berechnet wird. (Optional, Default:aktuelles Tagesdatum)
    */

export function getAge(DATEBIRTH, DATEREF = null) {
  //Berechnet das Alter in Jahren und Monaten zu einem bestimmten Referenzdatum
  if (!DATEBIRTH) {
    return { alter: '', monate: '' };
  }
  var today = new Date();
  if (DATEREF)
    today = new Date(DATEREF);
  var birthDate = new Date(DATEBIRTH);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  var monate = m
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
    monate = (monate == 12) ? 0 : 12 + monate;
  }

  return { alter: age, monate: monate };
}









// Funktionen für die Validierung von Lizenzen


export class ValidLicense {
  valid: boolean;
  modul: string;  // Name des Moduls
  kunde: string;  // Name des Berechtigten
  sub: string;    // BSNR
  exp: number;    // Timestamp des Endes der Lizenz
  licenses: any //JSON aller verfügbaren Lizenzen.
}


export function randStr() {
  let s = '';
  s = '' + Math.random() * (90000000000 - 10000000000) + 10000000000;
  return String(s).substring(1, 11);
}

export function validateLicense(nonce: string, jwt: string): ValidLicense {

  const secret = '894zr78349zgvbf789__';

  const parts = jwt.split('.');
  const payload = parts[0] + '.' + parts[1];

  const hash = base16.stringify(sha256(nonce + secret));
  const signature = hmac256(payload, hash);
  const olaf = utf8.stringify(base64url.parse(parts[1]));
  const json = JSON.parse(olaf);

  
  const result = new ValidLicense();

  result.valid = (base64url.stringify(signature) === parts[2])
    && (Date.now() < json.exp * 1000);

  result.modul = json.modul;
  result.kunde = json.kunde;
  result.sub = json.sub;
  result.exp = json.exp;
  result.licenses = json.licenses;
  return result;
}
