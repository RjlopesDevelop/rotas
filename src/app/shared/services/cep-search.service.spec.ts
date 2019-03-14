import { TestBed, inject } from '@angular/core/testing';

import { CepSearchService } from './cep-search.service';

describe('CepSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CepSearchService]
    });
  });

  it('should be created', inject([CepSearchService], (service: CepSearchService) => {
    expect(service).toBeTruthy();
  }));
});
