import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBarComponent } from './help-bar.component';
import { OverlayPanelModule} from 'primeng/overlaypanel';
import { CardModule} from 'primeng/card';
import { SidebarModule} from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('HelpBarComponent', () => {
  let component: HelpBarComponent;
  let fixture: ComponentFixture<HelpBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpBarComponent],
      imports: [BrowserAnimationsModule, OverlayPanelModule, CardModule, SidebarModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('show side bar', () => {
    component.showSideBar();
    expect(component.display).toEqual(true);
  });
});
