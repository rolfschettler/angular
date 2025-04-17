import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService, DbconfigService } from 'lib';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { first } from 'rxjs';
import { UsertableComponent } from '../../../../sharedcomponents/src/app/usertable/usertable.component';



@Component({
  selector: 'app-info',
  imports: [CommonModule,UsertableComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {


  constructor(private config: DbconfigService) { }


  ngOnInit() {
  }





}
