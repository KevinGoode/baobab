import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabViewModule} from 'primeng/tabview';
import { EditorModule} from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { FileDetailComponent } from './file-detail.component';
import { OrderListModule} from 'primeng/orderlist';
import { PanelModule } from 'primeng/primeng';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerFile } from '../server-file';
import { Injectable } from '@angular/core';
import { AuthorisationService } from '../authenticator/authorisation.service';
import { of } from 'rxjs/observable/of';
const  file1: ServerFile =  new ServerFile({id: './content/folder1/file1', name: 'file1', isDir:false,  sizeOnDisk: 0, lastReadAt: "2018-03-14T08:01:03+0000",
                                          lastUpdated: "2018-03-14T08:01:03+0000"});
const  folder1: ServerFile =  new ServerFile({id: './content/folder1', name: 'folder1', isDir:true,  sizeOnDisk: 0, lastReadAt: "2018-03-14T08:01:03+0000",
                                          lastUpdated: "2018-03-14T08:01:03+0000"});
folder1.addChild(file1);
describe('FileDetailComponent', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDetailComponent ],
      imports: [BrowserAnimationsModule, RouterTestingModule, TabViewModule, EditorModule, FormsModule, OrderListModule, PanelModule],
      providers:[{provide: AuthorisationService, useClass: AuthorisationServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set file details', () => {
    component.setTitle('Some title');
    component.setFileContent("Some file content");
    component.setFileSummary(file1);
  });

  it('should set folder details', () => {
    component.setTitle('Some title');
    component.setDirContents(folder1);
    component.setDirSummary(folder1);
  });
});

@Injectable()
export class AuthorisationServiceMock {
  constructor() { }
  loginEvents = of('');
  logoutEvents = of('');
  isUserLoggedIn(){return true;};
  getCurrentUserName(){return "";};
}

