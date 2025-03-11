import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { CanceldialogComponent } from './canceldialog/canceldialog.component';
import { CustomDialogComponent } from './custom-dialog/CustomDialog.component';

@Injectable({
  providedIn: 'root'
})

/**
*
* @usageNotes
* confirm(message:string,type:string='confirmation')
* YesNoDialog('Jetzt fortsetzen ?').subscribe(continue=>{ console.info(continue) })
* WaitForConfirm(message:string,type:string='confirmation').subscribe(res=>console.info(res))
*/



export class DialogService {

  constructor(private dialog: MatDialog) { }



 /**
 * Ein Bestätigungsdialog mit OK Button
 *
 * @Aufruf confirm(message:string,type:string='confirmation')
 * @param message
 * @returns Nichts
 */
  confirm(message: string, type: string = 'confirmation') {
    const dConfig = new MatDialogConfig();
    dConfig.data = { message: message, type: type };
    this.dialog.open(ConfirmdialogComponent, dConfig)

  }


  /**
   * 
   * @param message 
   * @param type ('confirmation' / 'warning')
   * @returns Observable 
   */
  WaitForConfirm(message: string, type: string = 'confirmation') {
    const dConfig = new MatDialogConfig();
    dConfig.data = { message: message, type: type };
    let dialogRef = this.dialog.open(ConfirmdialogComponent, dConfig)
    return dialogRef.afterClosed().pipe(map(value => { return value }));

  }



  /** 
  *  
  *  YesNoDialog('Jetzt fortsetzen ?').subscribe(continue=>{ console.info(continue) })
  *  @param message 
  *  @returns Observable (true/false)

  */

  YesNoDialog(message: string) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    let dialogRef = this.dialog.open(CanceldialogComponent, dialogConfig);

    return dialogRef.afterClosed().pipe(map(value => { return value }));

  }



  /** 
  * Beispiel:
  *   
  * let myarray=[
  * 
  *  {label:'Auswahl',value:'a',required:true,type:['a','b','c']},
  *  {label:'Objekteauswahl',value:'a',required:true,type:[{key:'1',value:'Topic1'},{key:'2',value:'Topic2'},{key:'3',value:'Topic3'}]},
  *  {label:'Vorname',value:'paul',required:true}
  *  {label:'Datum',value:'2024-12-02',required:true, type: 'date'
  * 
  *    ]
  *  
  *  InputDialog('MyTitle',myarray,'myHelpTopic').subscribe(res=>console.info(res))
  *  @param title:string
  *  @param  variables_array:any=[]
  *  @param  helptopic:string=''
  *  @returns variables_array
 */ 

  InputDialog( title:string,  variables_array:any=[],helptopic:string='') {
    const dConfig = new MatDialogConfig();


    
    dConfig.data = { title: title, array: variables_array,helptopic:helptopic };

    dConfig.disableClose=true
    let dialogRef = this.dialog.open(CustomDialogComponent, dConfig)
    return dialogRef.afterClosed().pipe(map(value => { return value }));

  }




}
