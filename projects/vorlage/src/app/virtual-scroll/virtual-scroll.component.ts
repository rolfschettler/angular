import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrl: './virtual-scroll.component.css',
  imports: [CommonModule, ScrollingModule],
})
export class VirtualScrollComponent {
  constructor() {}

  patienten = this.GetPatienten();

  GetPatienten() {
    return of(
      Array.from({ length: 100000 }, (_, i) => ({
        id: i + 1,
        vorname: `Vorname${i + 1}`,
        nachname: `Nachname${i + 1}`,
        plz: `1234${i}`,
        ort: `Ort${i + 1}`,
        strasse: `Strasse ${i + 1}`,
        beruf: `Beruf${i + 1}`,
      }))
    );
  }
}
