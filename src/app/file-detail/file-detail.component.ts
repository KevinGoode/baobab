import { Component, OnInit,Input, ViewChild} from '@angular/core';
import {Editor} from 'primeng/editor';
import { Router } from '@angular/router';
import { ServerFile } from '../server-file';
import { AuthorisationService } from '../authenticator/authorisation.service';
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
  title: string;
  private NO_FILE: string = "No file Selected";
  constructor(private router:Router, private loginlogoutEvents:AuthorisationService) { this.router= router}

  ngOnInit() {
    this.showFile();
    this.tabContentText = this.NO_FILE;
    this.tabInfoText = this.NO_FILE;
    this.directoryContents = [];
    
  }
  ngAfterViewInit() {
    this.loginlogoutEvents.loginEvents.subscribe(userName=>{
      this.enableEditor(true);
    });
    this.loginlogoutEvents.logoutEvents.subscribe(()=>{
      this.enableEditor(false);
    });

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
  public setDirSummary(dir:ServerFile){
    var timeStr: string = "N\A - No Files"
    if (dir.lastUpdated.getTime() !=0){
      timeStr=dir.lastUpdated.toLocaleString('en-GB')
    }
    var display = "Directory Name: " + dir.name + "\n";
    display +=  "Size Of Files: " + this.storageToString(dir.sizeOnDisk) + "\n";
    display += "Last Updated At: " +  timeStr + "\n";
    this.tabInfoText = display;
  }
  public onSelectionChange(event:any){
    var encoded :string = btoa(event.value[0].id);
    var url: string= "files?detail=" + encodeURIComponent(encoded);
    this.router.navigateByUrl(url);
  }
  public setFileSummary(file:ServerFile){
      var display = "File Name: " + file.name + "\n";
      display +=  "Size Of File: " + this.storageToString(file.sizeOnDisk) + "\n";
      display += "Last Updated At: " + file.lastUpdated.toLocaleString('en-GB') + "\n";
      this.tabInfoText = display;
  }
  private enableEditor(enable:boolean){
    if(enable){
      this.editor.quill.enable();
    }else{
      this.editor.quill.disable();
    }
  }
  private showFile(){
    this.editorVisible='block';
    this.directoryContentsVisible='none';
  }
  private showDirectory(){
    this.editorVisible='none';
    this.directoryContentsVisible='block';
  }
  private storageToString(num:number){
      var precision =2 ;
      var megaBytes:number = 2 << 20;
      var kiloBytes:number = 2 << 10;
      var convertedNumber:String = new Number(num).toPrecision(); //No rounding
      var units = " Bytes"
      if (num/megaBytes > 1){
          convertedNumber = new Number(num/megaBytes).toPrecision(precision);
          units = " MB";
      }else if (num/kiloBytes > 1){
          convertedNumber = new Number(num/kiloBytes).toPrecision(precision);
          units = " KB";
      }
      return convertedNumber + units;
  }
}
