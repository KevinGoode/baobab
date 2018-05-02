import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';
//Sending events between un-related components is best done using a service .See link below
//https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/#data-service-ts

@Injectable()
export class AuthorisationService{
  private loginEvent = new BehaviorSubject<string>("");
  private logoutEvent = new BehaviorSubject<string>("");
  private logoutWarningEvent = new BehaviorSubject<string>("");
  private currentUser: string = undefined;
  private started=false
  /*
  Used by clients who are interested in login events.
  Call subscribe on this object
  */
  loginEvents = this.loginEvent.asObservable();
  /*
  Used by clients who are interested in logout events
  Call subscribe on this object
  */
  logoutEvents = this.logoutEvent.asObservable();
  /*
  Used by clients who are interested in logout warning events
  Call subscribe on this object
  */
  logoutWarningEvents = this.logoutWarningEvent.asObservable();
  constructor() { 

  }

  
  /*
   Used by clients who want to know current login state
  */
  isUserLoggedIn():boolean{
    return (this.currentUser!=undefined);
  }
  /*
   Used by clients who want to know current login state
  */
  getCurrentUserName():string{
    return this.currentUser;
  }
  /*
  Used by authenticator component to send login events
  */
  sendLoginEvent(userName: string) {
    if (!this.currentUser){
    this.loginEvent.next(userName);
    this.currentUser=userName;
    }
  }
  /*
  Used by authenticator component to send logout events
  */
  sendLogoutEvent() {
      if (this.currentUser){
      this.logoutEvent.next("");
      this.currentUser=undefined;
      }
  }
  /*
  Used privately to send heartbeat events. Sends out number of seconds before expiry
  */
  sendLogoutWarningEvent(expiry) {
    this.logoutWarningEvent.next(expiry);
  }

}
