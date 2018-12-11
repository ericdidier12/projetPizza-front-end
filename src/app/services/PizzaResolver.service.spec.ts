/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PizzaResolverService } from './PizzaResolver.service';

describe('Service: PizzaResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PizzaResolverService]
    });
  });

  it('should ...', inject([PizzaResolverService], (service: PizzaResolverService) => {
    expect(service).toBeTruthy();
  }));
});
