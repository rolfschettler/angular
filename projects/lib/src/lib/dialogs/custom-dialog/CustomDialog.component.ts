import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './CustomDialog.component.html',
  styleUrls: ['./CustomDialog.component.scss'],
  imports:[CommonModule,MatDialogModule,MatIconModule ,FormsModule,MatButtonModule]
})
export class CustomDialogComponent implements OnInit {
  modulname = '';
  title: any = '';
  array: any = [];
  invalidArray: number[] = [];


  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>, @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title
    this.array = data.array;
    this.modulname = data.helptopic
  }

  ngOnInit() {
  }

  errorCheckOnBlur(id: number) {
    return //abgescghaltet!!!
    if (this.array[id].required) {
      if (!this.array[id].value && !this.invalidArray.includes(id)) {
        this.invalidArray.push(id)
      }
      else if (this.array[id].value && this.invalidArray.includes(id)) {
        this.invalidArray.forEach((nbr, index) => {
          if (nbr === id) this.invalidArray.splice(index, 1);
        });
      }
    }
  }

  checkIfArray(target) {
    return Array.isArray(target)
  }

  checkIfArrayOfObject(target) {
    let result = false
    result = Array.isArray(target)
    if (result) {
      result = (target[0]?.key !== undefined)
    }
    return result
  }



  checkInvalidity(id: number) {
    return this.invalidArray.includes(id)
  }

  dialogCancel() {
    this.dialogRef.close(null)
  }

  dialogSubmit() {
    this.invalidArray = [];
    this.array.forEach((element, index) => {
      if (!element.value && element.required) {
        this.invalidArray.push(index);
      }
    });
    if (this.invalidArray.length === 0) {

      this.dialogRef.close(this.array)
    }
  }


}
