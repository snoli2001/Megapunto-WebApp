import { TestBed } from '@angular/core/testing';

import { PayServicesService } from './pay-services.service';

describe('PayServicesService', () => {
  let service: PayServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
