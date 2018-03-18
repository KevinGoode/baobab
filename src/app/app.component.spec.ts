import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HelpDialogComponent, HelpBarComponent, TopPanelComponent
      ],
      imports:[RouterTestingModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Baobab'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Baobab');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('BaoBab');
  }));
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
@Component({
  providers: [],
  selector: 'app-top-panel',
  template: ''

})
 class TopPanelComponent{
  @Input() helpDialog :HelpDialogComponent;
  @Input() helpBar :HelpBarComponent;
 }