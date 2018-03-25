import { Component, OnInit, Input } from '@angular/core';
import { MenuModule} from 'primeng/menu';
import { MenuItem } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { LoginCredentialsProvider, LoginCredentialsSubscriber} from './login-credentials.interface';
import { AuthenticatorServiceBase} from "./service.model";
@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit, LoginCredentialsSubscriber{

  constructor(private authenticatorService: AuthenticatorServiceBase) { }
  logMenuItems: MenuItem[];
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
    var userName: string = userName;
    var passWord: string = password;
    var serviceCall:Observable<string> =this.authenticatorService.login(userName,passWord);
    serviceCall.subscribe(data=>{
      alert("Login Succeeded");
    },err=>{alert("Login failed");});
  }
  logoff(){

  }

}
