import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceldialogComponent } from './canceldialog.component';

describe('CanceldialogComponent', () => {
  let component: CanceldialogComponent;
  let fixture: ComponentFixture<CanceldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
