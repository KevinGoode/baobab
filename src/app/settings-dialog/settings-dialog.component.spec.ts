import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SliderModule} from 'primeng/slider';
import {InputSwitchModule} from 'primeng/inputswitch';
import { SettingsDialogComponent } from './settings-dialog.component';
import { DialogModule} from 'primeng/primeng'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {MessageService} from 'primeng/components/common/messageservice';
import { AuthorisationService } from '../authenticator/authorisation.service';
import { AuthenticatorServiceBase} from "../authenticator/authenticatorservice.model";
import { HeartbeatDetails} from '../authenticator/authorisation.service';
describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDialogComponent ],
      imports: [BrowserAnimationsModule, DialogModule, FormsModule, SliderModule,InputSwitchModule, ProgressSpinnerModule],
      providers:[MessageService,{provide: AuthenticatorServiceBase, useClass: AuthenticatorServiceMock},{provide: AuthorisationService, useClass: AuthorisationServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
  setSettings(lockMoveArticle: boolean,autoSaveArticle: boolean,autoSaveArticleFrequency: number,autoSaveArticleBeforeLogOut: boolean,autoSaveArticleBeforeLogOutTime: number): Observable<string>{
    return of('');
  }
      
}
@Injectable()
export class AuthorisationServiceMock {
  constructor() { }
  loginEvents = of('');
  logoutEvents = of('');
  logoutWarningEvents = of(new HeartbeatDetails());
  isUserLoggedIn(){return true;};
  getCurrentUserName(){return "";};
}