import { TestBed, inject } from '@angular/core/testing';

import { DefinitionService } from './definition.service';

describe('DefinitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefinitionService]
    });
  });

  it('should ...', inject([DefinitionService], (service: DefinitionService) => {
    expect(service).toBeTruthy();
  }));
});
