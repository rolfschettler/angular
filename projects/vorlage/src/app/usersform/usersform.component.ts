import { Component } from '@angular/core';


@Component({
  selector: 'app-usersform',
  standalone: false,
  templateUrl: './usersform.component.html',
  styleUrl: './usersform.component.scss',
  //imports:[ CommonModule, FormsModule, MatSelectModule]
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

    });

    //Custom-Error:
    if (form.form.controls['nachname'].value === 'knut') {
      form.form.controls['nachname'].errors = { forbiddenName: true };
    }

    console.info(this.users)
  }
}
