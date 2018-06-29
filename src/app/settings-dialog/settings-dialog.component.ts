import { Component, OnInit } from '@angular/core';
import { UserSettingsProvider} from '../authenticator/login-credentials.interface';
@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit, UserSettingsProvider {

  constructor() { }
  display: boolean = false;
  autoSave: boolean = true;
  logOutSave: boolean = true;
  moveArticle: boolean =false;
  autoSaveSeconds: number =50;
  autoSaveBeforeLogOutSeconds:  number =50;
  ngOnInit() {
  
  }
  public show(){
    this.display = true;
    console.debug("Showing settings dialog...");
  }
  public OnOk(){
    this.OnCancel();
  }
  public OnCancel(){
    this.display=false;
  }
}
