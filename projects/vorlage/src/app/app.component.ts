
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlertComponent, AlertModule, HeaderComponent, MaterialModule } from 'lib';



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



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, MaterialModule, AsyncPipe,CommonModule,HeaderComponent,AlertModule],
  templateUrl: './app.component.html',

  styleUrl: './app.component.css'
})
export class AppComponent {


  title = 'App-vorlage';


  
  public currentUser: Observable<any>;
  public loggedin=''

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}





