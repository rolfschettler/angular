import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MaterialModule } from 'lib';
import { AppComponent } from './src/app/app.component';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    
  ],

  imports: [
    CommonModule,
    MatSidenavModule,
    MaterialModule,
    AsyncPipe

  ],
  exports:[
    MatSidenavModule,
    MaterialModule


  ]
})
export class AppmoduleModule { }
