import { CommonModule } from '@angular/common';
import { AlertService } from './alert.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';





@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports:[CommonModule]
})
export class AlertComponent implements OnInit,OnDestroy {

  private subscription: Subscription | any;
  message: any={};

  constructor(private alertService: AlertService)
   { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
  });

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
}

}
