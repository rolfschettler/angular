/** Diese Directive ermöglicht es, eine Textarea mit einer automatischen Höhenanpassung erzeugen
 *  ************************************************************************************************
 * Beispiel :      <textarea matInput formControlName="message" placeholder="Nachricht"  appTextareaAutoresize></textarea>
 * 
 *                 <textarea autocomplete="off" [(ngModel)]="userInput" appTextareaAutoresize></textarea>
 * 
 */


import { Directive, ElementRef, HostListener,AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]'
})
export class TextareaAutoresizeDirective implements AfterViewInit,OnInit {

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }

    }

  ngOnInit() {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  resize() {
    
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
}

}
