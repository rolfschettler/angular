import { DbconfigService } from './../common/dbconfig.service';


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../common/authentication.service';



@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  message = '';
  
  

  Form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]

  });

  returnUrl: string;

  constructor(
    //
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private config:DbconfigService
  ) { 


    
  }



  doLogin() {

    if (this.Form.invalid) {
      return;
    }

    this.message = '';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.doLogin(this.Form.controls['email'].value, this.Form.controls['password'].value)
      .pipe(first())
      .subscribe(
        user => {
          if (user.id) {
            localStorage.setItem('loginuser', this.Form.get('email').value); //Für eine schnelle Anmeldung speichern
            this.router.navigateByUrl(this.returnUrl);
          }
          else
            this.message = 'E-Mail oder Passwort sind nicht korrekt';
        },
      )
  }




  ngOnInit() {
 
    this.Form.get('email').setValue(localStorage.getItem('loginuser')); //Letzter Anmeldename laden


    if(this.config.configuration.firmenname.toUpperCase().includes('DATA-AL')){
      // In der DemoVersion: Benutzername und Passwort vorgeben!
      this.Form.get('email').setValue('admin@demo.de');  
      this.Form.get('password').setValue('admin');  
    }


    this.authenticationService.doLogout();
  }

}
