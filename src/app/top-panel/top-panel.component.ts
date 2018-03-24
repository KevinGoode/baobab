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
  helpMenuItems: MenuItem[];
  display: boolean =false;
  @Input() helpDialog :HelpDialogComponent;
  @Input() helpBar :HelpBarComponent;
  ngOnInit() {

      this.helpMenuItems =  [
        {label: 'Help' , icon: 'fa-book', command: () => {
            this.helpSideBar();
        }},
        {label: 'About', icon: 'fa-question', command: () => {
            this.help();
        }}];
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
