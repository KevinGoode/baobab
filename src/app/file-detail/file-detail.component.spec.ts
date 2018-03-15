import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabViewModule} from 'primeng/tabview';
import { EditorModule} from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { FileDetailComponent } from './file-detail.component';
import { OrderListModule} from 'primeng/orderlist';
import { PanelModule } from 'primeng/primeng';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FileDetailComponent', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDetailComponent ],
      imports: [BrowserAnimationsModule, RouterTestingModule, TabViewModule, EditorModule, FormsModule, OrderListModule, PanelModule]
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
});
