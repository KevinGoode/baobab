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
  isDir:boolean = false;
  name: string;
  message:string ="";
  private manager:FilesViewManager;
  ngOnInit() {
  }
  public showDialog(manager:FilesViewManager, isDir:boolean=false) {
    this.isDir=isDir;
    this.manager=manager;
    if(this.isDir)
    {
        this.message = this.NEW_DIR;
    }else{
      this.message = this.NEW_FILE;
    }
    this.display = true;
  }
  public OnOk(){
    this.OnCancel();
    if(this.isDir){
        this.manager.createDirectory(this.name);
    }else{
      this.manager.createFile(this.name);
    }
  }
  public OnCancel(){
    this.display=false;
  }
  private NEW_FILE: string = "Enter name of new article";
  private NEW_DIR: string = "Enter name of new directory";
}
