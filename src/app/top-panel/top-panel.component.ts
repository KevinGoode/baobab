import { Component, Input, OnInit } from '@angular/core';
import { MenuModule} from 'primeng/menu';
import { MenuItem } from 'primeng/primeng'
import { HelpBarComponent } from '../help-bar/help-bar.component';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
@Component({
  providers: [],
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {

  constructor( ) { }
  logMenuItems: MenuItem[];
  helpMenuItems: MenuItem[];
  display: boolean =false;
  @Input() helpDialog :HelpDialogComponent;
  @Input() helpBar :HelpBarComponent;
  ngOnInit() {
    this.logMenuItems = [
      {label: 'Log On' , icon: 'fa-user', command: () => {
          this.logon();
      }},
      {label: 'Log Off', icon: 'fa-user-times', command: () => {
          this.logoff();
      }}];
      this.helpMenuItems =  [
        {label: 'Help' , icon: 'fa-book', command: () => {
            this.helpSideBar();
        }},
        {label: 'About', icon: 'fa-question', command: () => {
            this.help();
        }}];
  }
  logon(){

  }
  logoff(){

  }
  showFiles(){

  }
  help(){
    this.helpDialog.showDialog();
  }
  helpSideBar(){
    this.helpBar.showSideBar();
  }
}
