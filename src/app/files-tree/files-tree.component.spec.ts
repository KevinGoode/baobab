import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeModule} from 'primeng/tree';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilesTreeComponent } from './files-tree.component';
import { ContextMenuModule} from 'primeng/contextmenu';
import { OverlayPanelModule} from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { TreeNode} from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { ServerFile } from '../server-file';
import { Injectable } from '@angular/core';
import { AuthorisationService } from '../authenticator/authorisation.service';
import { HeartbeatDetails} from '../authenticator/authorisation.service';
import { FilesViewComponent } from '../files-view/files-view.component';
import { of } from 'rxjs/observable/of';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { DialogModule} from 'primeng/primeng'
import { FormsModule } from '@angular/forms'
import {FilesViewManager } from '../files-view/files-manager.interface'
import {CreateDialogComponent} from '../create-dialog/create-dialog.component';
const  file1: ServerFile =  new ServerFile({id: './content/folder1/file1', name: 'file1', isDir:false,  sizeOnDisk: 0, lastReadAt: "2018-03-14T08:01:03+0000",
                                          lastUpdated: "2018-03-14T08:01:03+0000"});
const  folder1: ServerFile =  new ServerFile({id: './content/folder1', name: 'folder1', isDir:true,  sizeOnDisk: 0, lastReadAt: "2018-03-14T08:01:03+0000",
                                          lastUpdated: "2018-03-14T08:01:03+0000"});
const  file2: ServerFile =  new ServerFile({id: './content/file2', name: 'file2', isDir:false,  sizeOnDisk: 0, lastReadAt: "2018-03-14T08:01:03+0000",
                                          lastUpdated: "2018-03-14T08:01:03+0000"});
const  root: ServerFile =  new ServerFile({id: './content', name: 'content', isDir:true,  sizeOnDisk: 0, lastReadAt: "2018-03-14T08:01:03+0000",
                                          lastUpdated: "2018-03-14T08:01:03+0000"});
//Init children  
folder1.addChild(file1);
root.addChild(folder1);
root.addChild(file2);                                  
describe('FilesTreeComponent', () => {
  let component: FilesTreeComponent;
  let fixture: ComponentFixture<FilesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesTreeComponent ,CreateDialogComponent],
       imports: [FormsModule,DialogModule,ConfirmDialogModule, BrowserAnimationsModule, RouterTestingModule, TreeModule, ContextMenuModule, PanelModule, OverlayPanelModule],
       providers:[ConfirmationService, {provide: AuthorisationService, useClass: AuthorisationServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesTreeComponent);
    component = fixture.componentInstance;
    component.parent= new MockFilesManager();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all files in tree', () => {
    expect(component.files).toBeUndefined();
    component.setAllFiles([root]);
    expect(component.files.length).toEqual(1);
  });
  it('should NOT fall over when selected item in tree does not exist', () => {
    component.setAllFiles([root]);
    expect(component.selectedFile).toBeUndefined();
    component.selectItemInTree('./content/folder1/nothing');
    expect(component.selectedFile).toBeUndefined();
    component.setContextMenu();
    component.showSelectedNodeInTree();
  });

  it('should show file in tree', () => {
    var FILE_NAME= './content/folder1/file1';
    component.setAllFiles([root]);
    expect(component.selectedFile).toBeUndefined();
    component.selectItemInTree(FILE_NAME);
    expect(component.selectedFile).toBeDefined();
    expect(component.selectedFile.data.id).toEqual(FILE_NAME);
    expect(component.selectedFile.data.isDir).toEqual(false);
    component.setContextMenu();
    component.showSelectedNodeInTree();
  });
  it('should show folder in tree', () => {
    var FOLDER_NAME= './content/folder1';
    component.setAllFiles([root]);
    component.selectItemInTree(FOLDER_NAME);
    expect(component.selectedFile).toBeDefined();
    expect(component.selectedFile.data.id).toEqual(FOLDER_NAME);
    expect(component.selectedFile.data.isDir).toEqual(true);
    component.setContextMenu();
    component.showSelectedNodeInTree();
  });
  it('should get data about file item in tree', () => {
      component.setAllFiles([root]);
      var file: ServerFile=component.getFileDataById('./content/folder1/file1');
      expect(file.isDir).toEqual(false);
  });
  it('should get data about folder item in tree', () => {
    component.setAllFiles([root]);
    var file: ServerFile=component.getFileDataById('./content/folder1');
    expect(file.name).toEqual('folder1');
    expect(file.id).toEqual('./content/folder1');
    expect(file.isDir).toEqual(true);
  });
  it('should NOT get data about unknown item in tree', () => {
    component.setAllFiles([root]);
    var file: ServerFile=component.getFileDataById('./contest');
    expect(file).toBeNull();
  });
  it('should save file', () => {
    component.setAllFiles([root]);
    var file: ServerFile=component.getFileDataById('./content/folder1/file1');
    component.save_file();
  });
  it('confirm save edits', () => {
    component.setAllFiles([root]);
    var file: ServerFile=component.getFileDataById('./content/folder1/file1');
    component.confirmSaveEdits("");
  });
  it('should log to console all context menu items tbd', () => {
    component.new_file();
    component.new_directory();
    component.delete_directory();
    component.rename_file();
    component.delete_file();
  });
  it('confirm clear node', () => {
    component.setAllFiles([root]);
    component.clearNodeEditing('./content/folder1/file1');
  });

});
@Injectable()
export class AuthorisationServiceMock {
  constructor() { }
  loginEvents = of('');
  logoutEvents = of('');
  logoutWarningEvents = of(new HeartbeatDetails());
  isUserLoggedIn(){return true;};
  getCurrentUserName(){return "";};
}
class MockFilesManager implements FilesViewManager
{
  saveFile(){}
  createFile(fileName:string){}
  deleteFile(){}
  renameFile(newName:string){}
  moveFile(fromId:string, toId:string ){}
  deleteDir(){}
  createDirectory(fileName:string){}
  edited():boolean{return false;}
  getCurrentId():string{return "";}
}