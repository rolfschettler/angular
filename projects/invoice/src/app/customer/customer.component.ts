import { MatDialog } from '@angular/material/dialog';
import { Customer } from './Customer';
import { CustomerService } from './customer.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import moment from 'moment';



import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";

export class CustomValidators {
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







@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
 imports:[
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule ,
   MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomerComponent implements OnInit,AfterViewInit {
  @ViewChild('formDirective') private formDirective: NgForm;

   


  customer: Customer;
  loading = false;
  submitted = false;
  errormessage = '';
  id: string="";
  @ViewChild("????????") focusInput: ElementRef;

  private formbuilder = inject(FormBuilder);

  Form = this.formbuilder.group({
   company_name: [null,[Validators.required]],
        country: [null],
        zip_code: [null],
        city: [null],
        street: [null],
        created_at: [null],
        id: [null],
        payment_terms: [null],
        vat_number: [null],
        tax_number: [null]
  }
    
  );

constructor(

  private route: ActivatedRoute,
  private router: Router,
  private customerService: CustomerService,
    private dialog: MatDialog
  ) { }

ngOnInit() {
  this.route.params.subscribe(params => {
    if(params['id']) 	
      this.id = params['id'];
    this.customerService.getRecord(this.id).subscribe(
      res => { this.customer = res; this.initForm(res); }
    )
  });

}


ngAfterViewInit(): void {
  this.formDirective.resetForm(); //Fehlerstatus und submitted zurücksetzen
  setTimeout(()=>{ 
    if(this.focusInput)		
        this.focusInput.nativeElement.focus();
  },0);
  
}


initForm(customer: Customer) {

  if (customer) {

    //Werte vom Array in die Form übertragen.
    for (var key in customer) {
      this.Form.patchValue({ [key]: customer[key]
    })
  }
}
  }


onSubmit() {
  this.submitted = true;
  this.Form.markAllAsTouched();
  if (this.Form.invalid) {
    return;
  }

  this.loading = true;
  let customer = new Customer;
  Object.assign(customer, this.Form.value);

//  let changedRecord=customlib.extractChanges(customer, this.customer);
    let changedRecord=customer;

  this.customerService.saveRecord(changedRecord, 'customer').subscribe({
      next: (ergebnis) => {
	//ergebnis.id Die ID wurde nach dem erfolgreichen Einfügen zurückgegeben
	Object.assign( this.Form.value, this.customer,);
        this.Form.get('id').setValue(ergebnis.id);

        // ggf:  this.router.navigate(['/customer', ergebnis.id]);
      },
      error: (error) => this.loading = false,
      complete: () => this.loading = false
    })
  }



setDatum(control) {
  //aktuelles tagesdatum setzen
  this.Form.get(control).patchValue(moment().format('YYYY-MM-DD'));
}

onCancel() {
  this.router.navigate(['/customer']);
}



}
