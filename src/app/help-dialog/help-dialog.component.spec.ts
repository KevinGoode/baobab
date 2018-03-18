import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDialogComponent } from './help-dialog.component';
import { DialogModule} from 'primeng/primeng'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('HelpDialogComponent', () => {
  let component: HelpDialogComponent;
  let fixture: ComponentFixture<HelpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDialogComponent ],
      imports: [BrowserAnimationsModule, DialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('show dialog', () => {
    component.showDialog();
    expect(component.display).toEqual(true);
  });
});
