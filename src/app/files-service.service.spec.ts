import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler} from '@angular/common/http';
import { FilesServiceService } from './files-service.service';

describe('FilesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesServiceService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([FilesServiceService], (service: FilesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
