import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SliderModule} from 'primeng/slider';
import {InputSwitchModule} from 'primeng/inputswitch';
import { SettingsDialogComponent } from './settings-dialog.component';
import { DialogModule} from 'primeng/primeng'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
describe('SettingsDialogComponent', () => {
  let component: SettingsDialogComponent;
  let fixture: ComponentFixture<SettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDialogComponent ],
      imports: [BrowserAnimationsModule, DialogModule, FormsModule, SliderModule,InputSwitchModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
