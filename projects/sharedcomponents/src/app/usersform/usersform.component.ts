

import * as customlib from 'lib';
import { UsersService } from './users.service';
import { User, rechtedef } from './user';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MailValidator } from './asyncvalidators';
import { CustomValidators,MaterialModule } from 'lib';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



@Component({
  selector: 'app-usersform',
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './usersform.component.html',
  styleUrls: ['./usersform.component.scss']
})
export class UsersformComponent implements OnInit {


  user: User = new User;
  loading = false;
  submitted = false;
  errormessage = '';
  rechte = rechtedef;

  id: string;
  @ViewChild("email", { static: true }) focusInput: ElementRef;
  Form: FormGroup;


 //private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private mailvalidator: MailValidator,
    private breakpointObserver:BreakpointObserver
  ) {

    this.Form = this.formBuilder.group({
      id: [0],//
      erstellungsdatum: [''], //
      rechte: [''],//
      username: ['', Validators.required],
      vorname: [''],
      nachname: [''],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      email: ['', [CustomValidators.emailValidator, Validators.required], this.mailvalidator.validate.bind(this.mailvalidator)],
    },
      {

        validators: [CustomValidators.match('password', 'password2')]
      }
    );



  }

isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Small)
    .pipe(
      map((result) => result.matches ),
      shareReplay()
    );




  ngOnInit() {
    //Eingabeformular, Controls für Rechte (dynamisch) zufügen:
    this.rechte.forEach(element => {
      let c = this.Form.addControl(element['recht'], this.formBuilder.control(false));


    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.usersService.getUser(this.id).subscribe(
        usr => {
          this.user = usr;
          this.initForm(usr);
        }
      )

    });

    // EHER STÖREND-> this.focusInput.nativeElement.focus();
    //Der Defaultuser muss immer Admin-rechte behalten.
    if (this.id == '0000000000')
      this.Form.controls['administrator'].disable();
  }


  initForm(_user: User) {
    let user = new User;
    Object.assign(user, _user);
    if (user) {
      //Werte vom Array in die Form übertragen.
      for (var key in user) {
        this.Form.patchValue({ [key]: user[key] })
      }

      //Rechte in Checkboxen übernehmen
      if (user.rechte) {
        let r = JSON.parse(user.rechte);
        for (var key in r) {
          this.Form.patchValue({ [key]: r[key] })
        }
      }


      this.Form.patchValue({ 'password2': user['password'] })
    }
  }




  onSubmit() {
    this.submitted = true;
    this.errormessage=''
    if (this.Form.invalid) {
      this.errormessage='Bitte überprüfen Sie Ihre Eingaben'
      return;
    }

    this.loading = true;
    let user = new User;
    for (let [key, value] of Object.entries(user)) {
      if (this.Form.get(key)) {

        user[key] = this.Form.get(key).value
      }
    }

    let r = {};
    //JSON aufbauen:
    this.rechte.forEach(element => {
      r[element['recht']] = this.Form.get(element['recht']).value;
    });

    user.rechte = JSON.stringify(r);
    let changes = (customlib.extractChanges(user, this.user));//Nur geänderte Felder werden übertragen.

    this.usersService.saveUser(changes).subscribe({
      next: (v) => { this.router.navigate(['/userslist', user.id]); },
      error: (e) => { this.loading = false; },
      complete: () => this.loading = false
    })
  }

  onCancel() {
    this.router.navigate(['/userslist']);
  }









}
