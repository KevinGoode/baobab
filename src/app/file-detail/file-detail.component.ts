import { Component, OnInit,Input, ViewChild} from '@angular/core';
import {Editor} from 'primeng/editor';
import { ServerFile } from '../server-file';
@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
  @ViewChild('editor') editor: Editor;
  tabContentText: string;
  tabInfoText: string;
  title: string
  private NO_FILE: string = "No file Selected";
  constructor() { }

  ngOnInit() {
    this.tabContentText = this.NO_FILE;
    this.tabInfoText = this.NO_FILE;

  }
  ngAfterViewInit() {
        //Disable editor
        this.editor.quill.disable();
  }
  public setContent(content:string){
    this.tabContentText=content;
  }
  public setTitle(title:string){
    this.title=title;
  }
  public setSummary(file:ServerFile){

    if (file.isDir){
       this.tabContentText = "Selected item is directory. No content can be displayed"
       this.tabInfoText = "Selected item is directory. No information can be displayed"
    }else{
      var display = "File Name: " + file.name + "\n";
      display +=  "Size On Disk: " + String(file.sizeOnDisk) + "\n";
      display += "Last Read At: " + file.lastReadAt.toTimeString() + " " + file.lastReadAt.toDateString() + "\n";
      display += "Last Updated At: " + file.lastUpdated.toTimeString() + " " + file.lastUpdated.toDateString() + "\n";
      this.tabInfoText = display;
    }
  }
}
