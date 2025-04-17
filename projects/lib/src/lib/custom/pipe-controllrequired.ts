import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Pipe({
    name: "controlRequired"
})
export class ControlRequiredPipe implements PipeTransform {
    public transform(control: AbstractControl): boolean {
        //  Return when no control or a control without a validator is provided
       
        if (!control || !control.validator) {
            return false;
        }

        //  Return the required state of the validator
        const validator = control.validator({} as AbstractControl);
        return validator && validator['required'];
    }
}





/*
Beispiel :
<strong *ngIf="form.get('vorname') | controlRequired">*</strong>

*/