import { TestBed } from '@angular/core/testing';

import { InternationalRechargeService } from './international-recharge.service';

describe('InternationalRechargeService', () => {
    let service: InternationalRechargeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(InternationalRechargeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
