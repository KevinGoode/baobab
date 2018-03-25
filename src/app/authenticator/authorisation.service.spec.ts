import { TestBed, inject } from '@angular/core/testing';

import { AuthorisationService } from './authorisation.service';

describe('AuthorisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorisationService]
    });
  });

  it('should be created', inject([AuthorisationService], (service: AuthorisationService) => {
    expect(service).toBeTruthy();
  }));
  it('should send login event ok', inject([AuthorisationService], (service: AuthorisationService) => {
    //First time we call this code evetn is sent, second time it is not sent (because iuser already logged in)
    service.sendLoginEvent("fred");
    service.sendLoginEvent("fred");
  }));
  it('should send logout event ok', inject([AuthorisationService], (service: AuthorisationService) => {
    //First time we call this code, logout event is sent, second time it is not sent (because user already logged out)
    service.sendLoginEvent("fred");
    service.sendLogoutEvent();
    service.sendLogoutEvent();
  }));
});
