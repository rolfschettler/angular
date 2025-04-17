import { ControlRequiredPipe } from './pipe-controllrequired';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePipe } from './custom-pipes';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateTimePipe,
    ControlRequiredPipe,
    TextareaAutoresizeDirective
  ],
  exports: [
    DateTimePipe,
    ControlRequiredPipe
  ],
  providers: [
    DateTimePipe,
    ControlRequiredPipe
  ]
})
export class CustomModule { }


