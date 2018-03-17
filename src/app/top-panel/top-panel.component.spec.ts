import { Component} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPanelComponent } from './top-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplitButtonModule} from 'primeng/splitbutton';
import { ButtonModule} from 'primeng/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopPanelComponent', () => {
  let component: TopPanelComponent;
  let fixture: ComponentFixture<TopPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPanelComponent , HelpDialogComponent, HelpBarComponent],
      imports: [BrowserAnimationsModule, RouterTestingModule, SplitButtonModule, ButtonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//Mock new components in this project
@Component({
  selector: 'app-help-dialog',
  template: ''
})
class HelpDialogComponent {
  public showDialog() {}
}
@Component({
  selector: 'app-help-bar',
  template: ''
})
class HelpBarComponent {
  public showSideBar() {}
}