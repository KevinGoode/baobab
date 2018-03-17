import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilesViewComponent } from './files-view.component';
import { FilesServiceService } from '../files-service.service'
import { Injectable } from '@angular/core';
import { Component} from '@angular/core';
import { ServerFile } from '../server-file';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

describe('FilesViewComponent', () => {
  let component: FilesViewComponent;
  let fixture: ComponentFixture<FilesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesViewComponent , FilesTreeComponent, FileDetailComponent],
       providers:[{provide: FilesServiceService, useClass: MockFilesServiceService}],
       imports: [RouterTestingModule], 
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
});

//Mock new components in this project
@Component({
  selector: 'app-files-tree',
  template: ''
})
class FilesTreeComponent {

  setAllFiles(serverFiles: ServerFile[]){
  }
}
@Component({
  selector: 'app-file-detail',
  template: ''
})
class FileDetailComponent {
  public showSideBar() {}
}

@Injectable()
export class MockFilesServiceService{
  constructor( ) {}
  getAllFiles(): Observable<any>{
    var empty = new ServerFile({name:'', isDir:true,sizeOnDisk:0,lastReadAt: new Date().toLocaleString(), lastUpdated: new Date().toLocaleString(), children:[]});
    return of(empty);
  }
  getFile(id:string ):Observable<string>{
    return of('');
  }
}