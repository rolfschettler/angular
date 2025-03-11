import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { forEachChild } from 'typescript';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-usersform',
  standalone: false,
  templateUrl: './usersform.component.html',
  styleUrl: './usersform.component.scss',
})
export class UsersformComponent {

  // toppings = new FormControl('');
  rechte: string[] = ['Arzt', 'Sachbearbeiter', 'Medizinische Fachkraft', 'VIP', 'Gast', 'global'];
   



  users: any = {
    id: '',
    username: '',
    vorname: '',
    nachname: '',
    password: '',
    email: '',
    rechte: '',
    erstellungsdatum: '',
  };

  OnSubmit(form: any) {
    //MarkAllAsTouched:
    Object.keys(form.form.controls).forEach((key) => {
      form.form.controls[key].touched = true;
    });

    //MarkAllAsDirty (has Changed):
    Object.keys(form.form.controls).forEach((key) => {
      form.form.controls[key].pristine = false;
      console.log(form.form.controls[key]);
    });

    //Custom-Error:
    if (form.form.controls['nachname'].value === 'knut') {
      form.form.controls['nachname'].errors = { forbiddenName: true };
    }

    console.log(this.users)
  }
}
