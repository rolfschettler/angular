import { MaterialModule } from './../material/material.module';
import { ToolbarModule } from 'al-lib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { UserslistComponent } from './userslist/userslist.component';
import { FilterPipe } from './userfilter';
import { ModaldialogsModule } from 'al-lib';
import { UsersformComponent } from './usersform/usersform.component';




@NgModule({
  declarations: [
    UserslistComponent,
    FilterPipe,
    UsersformComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarModule,
    ModaldialogsModule
   
  ]
})
export class UsersModule { }
