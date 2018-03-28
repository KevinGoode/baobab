import { Component, OnInit } from '@angular/core';
import {FilesViewManager } from '../files-view/files-manager.interface'
@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  constructor() { }
  display: boolean = false;
  name: string;
  message:string = "Enter name of new article";
  private manager:FilesViewManager;
  ngOnInit() {
  }
  public showDialog(manager:FilesViewManager) {
    this.manager=manager;
    this.display = true;
  }
  public OnOk(){
    this.OnCancel();
    this.manager.createFile(this.name);
  }
  public OnCancel(){
    this.display=false;
  }
}
