import { Observable } from 'rxjs/Observable';
import {AuthenticatorServiceProvider} from "./authenticator.interfaces";

export abstract class AuthenticatorServiceBase implements AuthenticatorServiceProvider {
    abstract login(userName:string, password:string): Observable<string>;
    abstract logout():Observable<string>;
    abstract loggedin():Observable<string>;
}
