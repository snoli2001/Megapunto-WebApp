import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalRechargeComponent } from './international-recharge.component';

describe('InternationalRechargeComponent', () => {
    let component: InternationalRechargeComponent;
    let fixture: ComponentFixture<InternationalRechargeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InternationalRechargeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InternationalRechargeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
