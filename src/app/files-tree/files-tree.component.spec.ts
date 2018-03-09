import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTreeComponent } from './files-tree.component';

describe('FilesTreeComponent', () => {
  let component: FilesTreeComponent;
  let fixture: ComponentFixture<FilesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesTreeComponent ]
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
