import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GrowlModule} from 'primeng/growl';
import {MessageService} from 'primeng/components/common/messageservice';
import { FilesViewComponent } from './files-view.component';
import { FilesServiceService } from '../files-service.service'
import { Injectable, Input } from '@angular/core';
import { Component} from '@angular/core';
import { ServerFile } from '../server-file';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import {FilesViewManager } from './files-manager.interface'
var dummyFile = {id: './content/file2', name:'file2', isDir:false,sizeOnDisk:0,lastReadAt: new Date().toLocaleString(), lastUpdated: new Date().toLocaleString(), children:[]};
var dummySubFile = {id: './content/subdir/subfile', name:'subfile', isDir:false,sizeOnDisk:0,lastReadAt: new Date().toLocaleString(), lastUpdated: new Date().toLocaleString(), children:[]};
var dummySubFolder = {id: './content/subdir', name:'subdir', isDir:true,sizeOnDisk:0,lastReadAt: new Date().toLocaleString(), lastUpdated: new Date().toLocaleString(), children:[dummySubFile]};
var dummyFolder = {id: './content', name:'content', isDir:true,sizeOnDisk:0,lastReadAt: new Date().toLocaleString(), lastUpdated: new Date().toLocaleString(), children:[dummyFile, dummySubFolder]};

describe('FilesViewComponent', () => {
  let component: FilesViewComponent;
  let fixture: ComponentFixture<FilesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesViewComponent , FilesTreeComponent, FileDetailComponent],
       providers:[MessageService,{provide: FilesServiceService, useClass: MockFilesServiceService}],
       imports: [GrowlModule,RouterTestingModule.withRoutes(
        [{path:'files',component: FilesViewComponent}]
      )], 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () =>{
    expect(component).toBeTruthy();
  });

  it('should route to get all files', () =>{
    component.route("/files");
  });
  it('should route to get individual file', () =>{
    var url:string = "/files?detail=" + btoa(dummyFile.id);
    component.route(url);
  });
  it('should route to get individual folder', () =>{
    var url:string = "/files?detail=" + btoa(dummyFolder.id);
    component.route(url);
  });
  it('should route to get all files again if cannot find individual files', () =>{
    var url:string = "/files?detail=" + btoa("./content/file1");
    component.route(url);
  });
  it('should save file', () =>{
    component.saveFile();
  });
  it('should create file', () =>{
    component.createFile('newfilename');
  });
  it('should rename file', () =>{
    component.renameFile('newfilename');
  });
  it('should delete file', () =>{
    component.deleteFile();
  });
  it('should delete dir', () =>{
    component.deleteDir();
  });
  it('should create dir', () =>{
    component.createDirectory("./content/brandnewdir");
  });
});

//Mock new components in this project
@Component({
  selector: 'app-files-tree',
  template: ''
})
class FilesTreeComponent {
  @Input() parent : FilesViewManager;
  serverFiles: ServerFile[];
  setContextMenu(){}
  showSelectedNodeInTree(){}
  clearNodeEditing(id:string){}
  selectItemInTree(id:string){}
  setAllFiles(serverFiles: ServerFile[]){
    this.serverFiles = serverFiles;
  }
   getFileDataById(id:string):ServerFile{
    var dFile = new ServerFile(dummyFile);
    var dFolder = new ServerFile(dummyFolder);
    var dSubFolder = new ServerFile(dummySubFolder);
    var dSubFile = new ServerFile(dummySubFolder);
    dSubFolder.addChild(dSubFile);
    dFolder.addChild(dSubFolder);
    dFolder.addChild(dFile);
    if(dummyFile.id == id){
      return dFile;
    }else if (dummyFolder.id == id){
      return dFolder;
    }else if (dummySubFolder.id == id){
      return dSubFolder;
    }else if (dummySubFile.id == id){
      return dSubFile;
    }
    return null;
  }
}
@Component({
  selector: 'app-file-detail',
  template: ''
})
class FileDetailComponent {
  public showSideBar() {}
  public initDetails() {}
  public setFileContent(content:string){}
  public setTitle(title:string){}
  public setFileSummary(file:ServerFile){}
  public setDirContents(dir:ServerFile){}
  public setDirSummary(file:ServerFile){}
}

@Injectable()
export class MockFilesServiceService{
  constructor( ) {}
  getAllFiles(): Observable<any>{
    var folder = new ServerFile(dummyFolder);
    folder.addChild(new ServerFile(dummyFile));
    return of(folder);
  }
  getFile(id:string ):Observable<string>{
    return of('');
  }
  editFile(id:string, body:string):Observable<string>{
    return of('');
  }
  createFile(id:string, body:string):Observable<string>{
    return of('');
  }
  renameFile(id:string, name:string):Observable<string>{
    return of('');
  }
  deleteFile(id:string):Observable<string>{
    return of('');
  }
  deleteDir(id:string):Observable<string>{
    return of('');
  }
  createDirectory(id:string):Observable<string>{
    return of('');
  }
}