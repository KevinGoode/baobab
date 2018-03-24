import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler} from '@angular/common/http';
import { AuthenticatorService } from './authenticator.service';
import { SplitButtonModule} from 'primeng/splitbutton';
describe('AuthenticatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatorService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([AuthenticatorService], (service: AuthenticatorService) => {
    expect(service).toBeTruthy();
  }));
});
