import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncommComponent } from './incomm.component';

describe('IncommComponent', () => {
  let component: IncommComponent;
  let fixture: ComponentFixture<IncommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
