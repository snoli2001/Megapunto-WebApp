import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankGuidePdfPopUpComponent } from './bank-guide-pdf-pop-up.component';

describe('BankGuidePdfPopUpComponent', () => {
  let component: BankGuidePdfPopUpComponent;
  let fixture: ComponentFixture<BankGuidePdfPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankGuidePdfPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankGuidePdfPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
