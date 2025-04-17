import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";


export class CustomValidators {






  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }


  static emailValidator(control: AbstractControl) {
    if (!control.value)
      return null;

    if (control.value.length == 0 || control.value.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")) {
      return null;
    } else {
      return { 'invalidEmail': true };
    }
  }


  static match(controlName: string, checkControlName: string): ValidatorFn {
    //Prüft, ob "controlName" und "checkControlName" den selben Wert haben (z.B. Passwortmatch)
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['NoMatch']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ NoMatch: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }





  static dateTimeValidator(control: AbstractControl) {
    if ((control.value) && (control.value !== '')) {
      let isValid = false;
      let s= control.value;
      const D = new Date(s);
      isValid = !isNaN(Date.parse(s))
      if (isValid){
        let arr=s.split('-');
        isValid=isValid && ( +arr[0]==D.getFullYear());
        isValid=isValid && ( +arr[1]==D.getMonth()+1);   
        isValid=isValid && (D.getFullYear()>1880);
        isValid=isValid && (D.getFullYear()<2300);
      }
      if (isValid) {
        return null
      } else {
        return { invalidDateTime: true };
      }
    }
    return null; //Leeres datum ist OK.
  }






}
