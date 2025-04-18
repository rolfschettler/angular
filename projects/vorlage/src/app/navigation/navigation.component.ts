import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthenticationService } from 'lib';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    CommonModule,
    FormsModule,
    MatTooltipModule



  ],
})
export class NavigationComponent {
  allwaysCloseSidebar=true; //Die Navigation wird ausgeblendet, auch bei großen Monitoren


  private document = inject(DOCUMENT);
  isdark:boolean=this.document.body.classList.contains('dark');

  ChangeMode() {
    this.document.body.classList.toggle('dark');
    this.isdark=this.document.body.classList.contains('dark');
    

}







  //private breakpointObserver = inject(BreakpointObserver);
  darkmode:boolean=false
  public currentUser: Observable<any>;
  public loggedin = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.current_User();
    this.authenticationService.LoggedinUserSubject.subscribe((res) => {
      this.loggedin = '' + res;
    });
  }

  /* 
     https://blog.angular-university.io/angular-responsive-design/ 
     https://material.angular.io/cdk/layout/overview
  
  */ 
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches || this.allwaysCloseSidebar),
      shareReplay()
    );


   
}
