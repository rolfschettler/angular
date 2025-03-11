import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

// https://www.techiediaries.com/angular-material-dialogs/

@Component({
  selector: 'app-canceldialog',
  templateUrl: './canceldialog.component.html',
  styleUrls: ['./canceldialog.component.scss'],
  imports:[MatDialogModule,MatButtonModule]
})
export class CanceldialogComponent {


  message = 'Wirklich fortsetzen ?'

  constructor(public dialogRef: MatDialogRef<CanceldialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data;

  }

  close(docontinue: boolean) {
    this.dialogRef.close(docontinue);
  }





}
