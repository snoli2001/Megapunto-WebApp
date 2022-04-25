import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpCellphoneBallanceComponent } from './top-up-cellphone-ballance.component';

describe('TopUpCellphoneBallanceComponent', () => {
  let component: TopUpCellphoneBallanceComponent;
  let fixture: ComponentFixture<TopUpCellphoneBallanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpCellphoneBallanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpCellphoneBallanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
