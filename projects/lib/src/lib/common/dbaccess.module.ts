
import { LoginModule } from './../login/login.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbconfigService } from './dbconfig.service';

import { HttpClientModule,  HTTP_INTERCEPTORS, } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { HttpauthinterseptorService } from './../interceptor/httpauthinterseptor.service';
import { HTTPErrorInterceptorService } from './../interceptor/httperrorinterseptor.service';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LoginModule,
    

  ],
  declarations: [

  ],
  exports: [

  ],

  providers: [

    //DbconfigService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpauthinterseptorService,
      multi: true,
    },

  ]


})
export class DbaccessModule { }
