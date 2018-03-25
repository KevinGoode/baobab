import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDialogComponent } from './login-dialog.component';
import { DialogModule} from 'primeng/primeng'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { LoginCredentialsSubscriber } from '../authenticator/login-credentials.interface';
import { last } from '@angular/router/src/utils/collection';
describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent ],
      imports: [BrowserAnimationsModule, DialogModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get credentials and pass to subscriber on ok', () => {
    var subscriber = new MockLoginCredentialsSubscriber();
    component.getCredentials(subscriber);
    component.userName = "Joe";
    component.password = "nopass";
    component.OnOk();
    expect(subscriber.userName).toEqual("Joe");
    expect(subscriber.password).toEqual("nopass");
  });
  it('should hide dialog on cancel', () => {
    component.OnCancel()
    expect(component.display).toEqual(false);
  });
});
class MockLoginCredentialsSubscriber implements LoginCredentialsSubscriber{
  userName : string;
  password : string;
  constructor() {  }

  gotCredentials( userName : string, password : string){
    this.userName=userName
    this.password=password;
  }
}