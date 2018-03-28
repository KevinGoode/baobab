import { ServerFile } from './server-file';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const FILES_SCRIPT: string = './test-scripts/files.php';
@Injectable()
export class FilesServiceService {

  constructor( private http: HttpClient) {}

  getAllFiles(): Observable<any>{
    var url : string ="api/files.php";
    return this.http.get(url);
  }
  getFile(id:string ):Observable<string>{
    return this.http.get(this.getUrlFromid(id), {responseType: 'text'});
  }
  editFile(id:string, body:string):Observable<string>{
    return this.http.put(this.getUrlFromid(id), body, {responseType: 'text', headers:new HttpHeaders('Content-Type: text/plain')});
  }
  private getUrlFromid(id:string):string{
    var url : string ="api/files.php?detail=" + btoa(id);
    return url;
  }
}

