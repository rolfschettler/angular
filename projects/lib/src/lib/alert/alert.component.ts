import { AlertService } from './alert.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { MatDialog,MatDialogConfig } from '@angular/material/dialog';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone:false
})
export class AlertComponent implements OnInit,OnDestroy {

  private subscription: Subscription | any;
  message: any;

  constructor(private alertService: AlertService,  private dialog:MatDialog) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
  });

  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
