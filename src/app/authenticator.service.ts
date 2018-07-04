import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatorServiceBase} from './authenticator/authenticatorservice.model';
@Injectable()
export class AuthenticatorService implements AuthenticatorServiceBase{

  constructor( private http: HttpClient) {}
  
  setSettings(lockMoveArticle: boolean,autoSaveArticle: boolean,autoSaveArticleFrequency: number,autoSaveArticleBeforeLogOut: boolean,autoSaveArticleBeforeLogOutTime: number,): Observable<string>{
    var url : string ="api/settings.php";
    return this.http.put(url, {lockMoveArticle:lockMoveArticle,autoSaveArticle:autoSaveArticle,autoSaveArticleFrequency:autoSaveArticleFrequency,autoSaveArticleBeforeLogOut:autoSaveArticleBeforeLogOut,autoSaveArticleBeforeLogOutTime:autoSaveArticleBeforeLogOutTime}, {responseType: 'text'});
  }
  login(userName:string, password:string): Observable<string>{
    var url : string ="api/login.php";
    return this.http.post(url, {id: userName + ':' + password}, {responseType: 'text'});
  }
  logout():Observable<string>{
    var url : string ="api/logout.php";
    return this.http.post(url, {},{responseType: 'text'});
  }
  loggedin():Observable<string>{
    var url : string ="api/heartbeat.php";
    return this.http.post(url, {},{responseType: 'text'});
  }
}
