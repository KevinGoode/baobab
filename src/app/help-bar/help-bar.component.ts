import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-bar',
  templateUrl: './help-bar.component.html',
  styleUrls: ['./help-bar.component.css']
})
export class HelpBarComponent implements OnInit {

  constructor() { }
  display: boolean = false;
  ngOnInit() {
  }
  public showSideBar() {
    this.display = true;
    console.debug("Showing panel...");
  }
}
