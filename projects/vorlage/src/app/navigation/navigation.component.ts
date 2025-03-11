import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet,RouterLink } from '@angular/router';
import { AuthenticationService } from 'lib';

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
    
    

  ],
})
export class NavigationComponent {
  //private breakpointObserver = inject(BreakpointObserver);

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

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
