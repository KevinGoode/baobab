import { TestBed, inject } from '@angular/core/testing';

import { FilesServiceService } from './files-service.service';

describe('FilesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesServiceService]
    });
  });

  it('should be created', inject([FilesServiceService], (service: FilesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
