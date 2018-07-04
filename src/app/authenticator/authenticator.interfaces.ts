import { Observable } from 'rxjs/Observable';
export interface AuthenticatorServiceProvider {
    login(userName:string, password:string): Observable<string>;
    logout():Observable<string>;
    loggedin():Observable<string>;
    setSettings(lockMoveArticle: boolean,autoSaveArticle: boolean,autoSaveArticleFrequency: number,autoSaveArticleBeforeLogOut: boolean,autoSaveArticleBeforeLogOutTime: number): Observable<string>;
      
}