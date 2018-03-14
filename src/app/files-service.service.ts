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
    var url : string ="api/files.php?detail=" + btoa(id);
    return this.http.get(url, {responseType: 'text'});
  }
}

