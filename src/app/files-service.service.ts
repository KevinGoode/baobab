import { ServerFile } from './server-file';
import { MockFilesServiceGetAll, MockFilesGet } from './mock-files';
import { Injectable } from '@angular/core';

@Injectable()
export class FilesServiceService {

  constructor() { }
  getAllFiles(){
    /*
     
     for(var i=0; i<MockFilesServiceGetAll.children.length; i++){
        var file: ServerFile = this.getChild(MockFilesServiceGetAll.children[i]);
        files.push(file);
     }
     */
    var files: ServerFile[] = new Array<ServerFile>();
    var files: ServerFile[] = new Array<ServerFile>();
    var file: ServerFile = this.getChild(MockFilesServiceGetAll);
    files.push(file);
     
     return files;
  }
  getFile(id:string ):string{
    var content: string = "blah";
    for(var i=0;i<MockFilesGet.length;i++){
        if (MockFilesGet[i].id == id){
            content = MockFilesGet[i].data;
            break;
        }
       }
       return content;
  }
  private getChild(child: any): ServerFile{
    var childFile :ServerFile = new ServerFile(child);
    for(var i=0;i<child.children.length;i++){
       childFile.addChild(this.getChild(child.children[i]));
    }
    return childFile;
  }
}
