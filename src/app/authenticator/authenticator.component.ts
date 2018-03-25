import { Component, OnInit, Input } from '@angular/core';
import { MenuModule} from 'primeng/menu';
import { MenuItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import {Message} from 'primeng/api';
import { LoginCredentialsProvider, LoginCredentialsSubscriber} from './login-credentials.interface';
import { AuthenticatorServiceBase} from "./authenticatorservice.model";
import { AuthorisationService } from './authorisation.service'
import { MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit, LoginCredentialsSubscriber{

  constructor(private messageService: MessageService, private loginLogoutEvents: AuthorisationService, private authenticatorService: AuthenticatorServiceBase) { }
  logMenuItems: MenuItem[];
  msgs: Message[] = [];
  private userName: string = "";
  @Input() credentialsGatherer:LoginCredentialsProvider;
  ngOnInit() {
    this.logMenuItems = [
      {label: 'Log On' , icon: 'fa-user', command: () => {
          this.logon();
      }},
      {label: 'Log Off', icon: 'fa-user-times', command: () => {
          this.logoff();
      }}];
  }
  logon(){
    this.credentialsGatherer.getCredentials(this);
  }
  /*
  Callback when credentials have been gathered
  */
  gotCredentials(userName: string, password: string){
    var passWord: string = password;
    this.userName = userName;
    this.authenticatorService.login(userName,passWord).subscribe(data=>{
      this.loginLogoutEvents.sendLoginEvent(userName);
      this.messageService.add({severity:'success', summary:'Authentication', detail:'User ' + userName + " logged in"})
    },err=>{
      this.messageService.add({severity:'error', summary:'Authentication', detail:'Error logging in user ' + userName + " . Check username and password and try again"})
    });
  }
  logoff(){
    this.authenticatorService.logout().subscribe(data=>{
      
      this.loginLogoutEvents.sendLogoutEvent();
      this.messageService.add({severity:'success', summary:'Authentication', detail:'User ' + this.userName + " logged out"})
      this.userName = "";
    },err=>{
     this.messageService.add({severity:'error', summary:'Authentication', detail:'Error logging outuser ' + this.userName})
    });

  }

}
