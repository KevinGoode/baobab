import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//Sending events between un-related components is best done using a service .See link below
//https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/#data-service-ts

@Injectable()
export class AuthorisationService {
  private loginEvent = new BehaviorSubject<string>("");
  private logoutEvent = new BehaviorSubject<string>("");
  private currentUser: string = undefined;
  currentloginEvent = this.loginEvent.asObservable();
  currentlogutEvent = this.logoutEvent.asObservable();
  constructor() { }
  sendLoginEvent(userName: string) {
    if (!this.currentUser){
    this.loginEvent.next(userName);
    this.currentUser=userName;
    }
  }
  sendLogoutEvent() {
      if (this.currentUser){
      this.loginEvent.next(this.currentUser);
      this.currentUser=undefined;
      }
  }
}
