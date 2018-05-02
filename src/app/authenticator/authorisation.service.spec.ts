import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { AuthorisationService } from './authorisation.service';
import { AuthenticatorServiceBase} from "./authenticatorservice.model";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
describe('AuthorisationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorisationService, {provide: AuthenticatorServiceBase, useClass: AuthenticatorServiceMock}]
    });
  });

  it('should be created', inject([AuthorisationService], (service: AuthorisationService) => {
    expect(service).toBeTruthy();
  }));
  it('should send login event ok', inject([AuthorisationService], (service: AuthorisationService) => {
    //First time we call this code event is sent, second time it is not sent (because user already logged in)
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
@Injectable()
export class AuthenticatorServiceMock extends AuthenticatorServiceBase {
  login(userName:string, password:string): Observable<string>{
    return of('');
  }
  logout():Observable<string>{
    return of('');
  }
  loggedin():Observable<string>{
  return of('');
  }
}