import { Component, OnInit, Input} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPanelComponent } from './top-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplitButtonModule} from 'primeng/splitbutton';
import { ButtonModule} from 'primeng/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopPanelComponent', () => {
  let component: TopPanelComponent;
  let fixture: ComponentFixture<TopPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPanelComponent , HelpDialogComponent, HelpBarComponent,LoginDialogComponent, AuthenticatorComponent],
      imports: [BrowserAnimationsModule, RouterTestingModule, SplitButtonModule, ButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPanelComponent);
    component = fixture.componentInstance;
    component.helpDialog = new HelpDialogComponent();
    component.helpBar = new HelpBarComponent();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call all help menu items', () => {
    for (var i=0;i<component.helpMenuItems.length;i++){
      component.helpMenuItems[i].command();
    }
  });
  
});

//Mock new components in this project
interface LoginCredentialsProvider{}
@Component({
  selector: 'app-help-dialog',
  template: ''
})
class HelpDialogComponent implements OnInit{
  display: boolean = false;
  ngOnInit() {}
  public showDialog() {}
}
@Component({
  selector: 'app-help-bar',
  template: ''
})
class HelpBarComponent implements OnInit{
  display: boolean = false;
  ngOnInit() {}
  public showSideBar() {}
}
@Component({
  selector: 'app-login-dialog',
  template: ''
})
class LoginDialogComponent implements OnInit, LoginCredentialsProvider{
  display: boolean = false;
  ngOnInit() {}
}
@Component({
  selector: 'app-authenticator',
  template: ''
})
class AuthenticatorComponent implements OnInit{
  constructor() { }
  @Input() credentialsGatherer:LoginCredentialsProvider;
  ngOnInit() {}
}