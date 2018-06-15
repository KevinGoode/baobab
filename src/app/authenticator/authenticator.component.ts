import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { MenuModule} from 'primeng/menu';
import { MenuItem } from 'primeng/primeng';
import { Observable, Subscription } from 'rxjs';
import {Message} from 'primeng/api';
import { LoginCredentialsProvider, LoginCredentialsSubscriber} from './login-credentials.interface';
import { AuthenticatorServiceBase} from "./authenticatorservice.model";
import { AuthorisationService } from './authorisation.service'
import { HeartbeatDetails } from './authorisation.service'
import { MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit, OnDestroy,LoginCredentialsSubscriber{

  constructor(private messageService: MessageService, private loginLogoutEvents: AuthorisationService, private authenticatorService: AuthenticatorServiceBase) { }
  logMenuItems: MenuItem[];
  msgs: Message[] = [];
  private userName: string = "";
  private timer = undefined;
  private sub: Subscription;
  @Input() credentialsGatherer:LoginCredentialsProvider;
  ngOnInit() {
    this.timer = Observable.timer(0, 10000);//0, 10 seconds 
    if(this.timer){
        this.sub = this.timer.subscribe((t) => this.onheartBeat());
    }
    this.logMenuItems = this.logOnMenuItems;
    this.loginLogoutEvents.loginEvents.subscribe(userName=>{
      this.logMenuItems = this.logOffMenuItems;
    });
    this.loginLogoutEvents.logoutEvents.subscribe(()=>{
      this.logMenuItems = this.logOnMenuItems;
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
  onheartBeat(){
    if(this.authenticatorService){
      this.authenticatorService.loggedin().subscribe(data=>{
        var obj = JSON.parse(data);
          if(!this.loginLogoutEvents.isUserLoggedIn()){
            this.loginLogoutEvents.sendLoginEvent(obj.User);
          }
          var expires: number = obj.expires;
          var autoSaveFlag: boolean = obj.settings.autoSaveArticle;
          var timeBeforeLogoutSave: number = obj.settings.autoSaveArticleBeforeLogOutTime;
          var autoSaveBeforeLogout: boolean  = obj.settings.autoSaveArticleBeforeLogOut;
          var autoSaveArticleFrequency: number  =  obj.settings.autoSaveArticleFrequency;
          var details = new HeartbeatDetails(expires, autoSaveFlag, autoSaveArticleFrequency, autoSaveBeforeLogout, timeBeforeLogoutSave);
          this.loginLogoutEvents.sendLogoutWarningEvent(details);
        },
        err=>{
              if(this.loginLogoutEvents.isUserLoggedIn()){
              this.loginLogoutEvents.sendLogoutEvent();
              }
      });
    }
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
     this.messageService.add({severity:'error', summary:'Authentication', detail:'Error logging out user ' + this.userName})
    });

  }
  private logOnMenuItems =[{label: 'Logon' , icon: 'fa-user', command: () => {this.logon();}},
                           {label: 'Logoff', icon: 'fa-user-times', disabled:true, command: () => {this.logoff();}}];
  private logOffMenuItems =[{label: 'Logon' , icon: 'fa-user', disabled:true, command: () => {this.logon();}},
                           {label: 'Logoff', icon: 'fa-user-times',  command: () => {this.logoff();}}];
}
