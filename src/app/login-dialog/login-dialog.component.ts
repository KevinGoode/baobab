import { Component, OnInit } from '@angular/core';
import { LoginCredentialsProvider, LoginCredentialsSubscriber} from '../authenticator/login-credentials.interface';
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit, LoginCredentialsProvider {

  constructor() { }

  display: boolean = false;
  userName: string;
  password: string;
  private subscriber:LoginCredentialsSubscriber = undefined;
  ngOnInit() {
  }
  public getCredentials(subscriber: LoginCredentialsSubscriber) {
      this.subscriber = subscriber
      this.display = true;
      console.debug("Showing dialog...");
  }
  public OnOk(){
    this.subscriber.gotCredentials(this.userName,this.password);
    this.OnCancel();
  }
  public OnCancel(){
    this.display=false;
  }
}
