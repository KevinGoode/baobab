import { Component, OnInit,Input, ViewChild} from '@angular/core';
import {Editor} from 'primeng/editor';
import { Router } from '@angular/router';
import { ServerFile } from '../server-file';
@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
  @ViewChild('editor') editor: Editor;
  editorVisible:string;
  directoryContentsVisible:string;
  tabContentText: string;
  tabInfoText: string;
  dirPanelText:string;
  directoryContents: ServerFile[];
  title: string
  private NO_FILE: string = "No file Selected";
  constructor(private router:Router) { this.router= router}

  ngOnInit() {
    this.showFile();
    this.tabContentText = this.NO_FILE;
    this.tabInfoText = this.NO_FILE;
    this.directoryContents = [];

  }
  ngAfterViewInit() {
        //Disable editor
        this.editor.quill.disable();
  }

  public setFileContent(content:string){
    this.showFile();
    this.tabContentText=content;
  }
  public setTitle(title:string){
    this.title=title;
  }
  public setDirContents(dir:ServerFile){
    this.showDirectory();
    this.directoryContents=dir.children;
  }
  public setDirSummary(file:ServerFile){
    this.tabInfoText = "TBD";
  }
  public onSelectionChange(event:any){
    var encoded :string = btoa(event.value[0].id);
    var url: string= "files?detail=" + encodeURIComponent(encoded);
    this.router.navigateByUrl(url);
  }
  public setFileSummary(file:ServerFile){
      var display = "File Name: " + file.name + "\n";
      display +=  "Size On Disk: " + String(file.sizeOnDisk) + "\n";
      display += "Last Read At: " + file.lastReadAt.toLocaleString('en-GB') + "\n";
      display += "Last Updated At: " + file.lastUpdated.toLocaleString('en-GB') + "\n";
      this.tabInfoText = display;
  }
  private showFile(){
    this.editorVisible='block';
    this.directoryContentsVisible='none';
  }
  private showDirectory(){
    this.editorVisible='none';
    this.directoryContentsVisible='block';
  }

}
