import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticatorComponent } from './authenticator.component';
import { SplitButtonModule} from 'primeng/splitbutton';
import { GrowlModule} from 'primeng/growl';
import { AuthenticatorServiceBase} from "./authenticatorservice.model";
import { LoginCredentialsProvider, LoginCredentialsSubscriber} from './login-credentials.interface';
import { AuthorisationService } from './authorisation.service'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {MessageService} from 'primeng/components/common/messageservice';

describe('AuthenticatorComponent', () => {
  let component: AuthenticatorComponent;
  let fixture: ComponentFixture<AuthenticatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatorComponent ],
      providers:[MessageService, {provide: AuthenticatorServiceBase, useClass: AuthenticatorServiceMock}, {provide: AuthorisationService, useClass: AuthorisationServiceMock}],
      imports: [BrowserAnimationsModule, SplitButtonModule, GrowlModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatorComponent);
    component = fixture.componentInstance;
    component.credentialsGatherer = new MockCredentialsGather();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call all log menu items', () => {
    for (var i=0;i<component.logMenuItems.length;i++){
      component.logMenuItems[i].command();
    }
  });
  
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
export class MockCredentialsGather implements LoginCredentialsProvider {

  constructor() { }

  userName: string = "fred"
  password: string = "no pass";
  private subscriber:LoginCredentialsSubscriber = undefined;
  ngOnInit() {
  }
  public getCredentials(subscriber: LoginCredentialsSubscriber) {
    subscriber.gotCredentials(this.userName, this.password);
  }
 
}
@Injectable()
export class AuthorisationServiceMock {
  constructor() { }
  sendLoginEvent(userName: string) {
    //Do nothing
  }
  sendLogoutEvent() {
    //Do nothing
  }
}