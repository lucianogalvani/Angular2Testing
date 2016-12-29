/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeroDetailService } from './hero-detail.service';

describe('HeroDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroDetailService]
    });
  });

  it('should ...', inject([HeroDetailService], (service: HeroDetailService) => {
    expect(service).toBeTruthy();
  }));
});
