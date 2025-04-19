import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService,MaterialModule,} from 'lib';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MaterialModule, CommonModule, NavigationComponent],
})
export class AppComponent implements OnInit, AfterViewInit {
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

  ngOnInit() {}

  ngAfterViewInit(): void {}

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  title = 'Invoice';
}
