import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeModule} from 'primeng/tree';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilesTreeComponent } from './files-tree.component';
import { ContextMenuModule} from 'primeng/contextmenu';
import { PanelModule } from 'primeng/primeng';
import { TreeNode} from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
describe('FilesTreeComponent', () => {
  let component: FilesTreeComponent;
  let fixture: ComponentFixture<FilesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesTreeComponent ],
       imports: [BrowserAnimationsModule, RouterTestingModule, TreeModule, ContextMenuModule, PanelModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
