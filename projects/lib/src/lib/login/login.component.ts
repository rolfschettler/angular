import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DbconfigService } from '../common/dbconfig.service';
import { AuthenticationService } from '../common/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { first } from 'rxjs';
// import { encryptText } from '../common/pwdhash';
// import { decryptText } from '../common/pwdhash';



@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatSelectModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formChangesSubscription: any;





  year = (new Date()).getFullYear()
  email: string = '';
  password: string = '';
  rememberme: boolean = true;

  loading = false;
  message = '';
  returnUrl: string = '';


  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private config: DbconfigService
  ) {

  }


  ngOnInit() {
    this.rememberme = localStorage.getItem('rememberme') === 'JA'; //
    if (this.rememberme) {
      this.email = localStorage.getItem('loginuser'); //Letzter Anmeldename laden
      //this.password=localStorage.getItem('password'); //Letztes Passwort laden
    }
    this.authenticationService.doLogout();
  }


  dataChanged(event) {
    this.message = '';

  }

  doLogin(form) {
    //MarkAllAsTouched:
    Object.keys(form.form.controls).forEach((key) => {
      form.form.controls[key].touched = true;
    });
    //MarkAllAsDirty (has Changed):
    Object.keys(form.form.controls).forEach((key) => {
      form.form.controls[key].pristine = false;
      
    });


    if (form.invalid) {
      return;
    }

    this.message = '';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService
      .doLogin(
        this.email,
        this.password
      )
      .pipe(first())
      .subscribe((user) => {
        if (user.id) {
          localStorage.setItem('loginuser', this.email); //Für eine schnelle Anmeldung speichern
          //localStorage.setItem('password', this.password); //Für eine schnelle Anmeldung speichern
          localStorage.setItem('rememberme', this.rememberme ? 'JA' : ''); //Letzter Anmeldename laden
          this.router.navigateByUrl(this.returnUrl);
        } else this.message = 'E-Mail oder Passwort sind nicht korrekt';
      });







  }



}
