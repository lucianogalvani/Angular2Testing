/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TwainService } from './twain.service';

describe('TwainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwainService]
    });
  });

  it('should ...', inject([TwainService], (service: TwainService) => {
    expect(service).toBeTruthy();
  }));
});
