import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

// https://www.techiediaries.com/angular-material-dialogs/

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss'],
  imports:[MatDialogModule,MatButtonModule,CommonModule]
})





export class ConfirmdialogComponent {


  message = 'Hinweis'
  type = 'confirmation';

  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

   //mögliches Datenpaket :  {message:'nachricht', type:'warning'||'confirmation'}

    
    if (data.type) {
      this.type = data.type;
    }
    if (data.message) {
      this.message = data.message;
    }
    else
      this.message = data;

  }

  close(docontinue: boolean) {
    this.dialogRef.close(docontinue);
  }





}
