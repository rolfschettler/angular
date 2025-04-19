import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-sidesheet',
  imports: [MatToolbarModule,MatSidenavModule,MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './sidesheet.component.html',
  styleUrl: './sidesheet.component.scss'
})
export class SidesheetComponent {

}
