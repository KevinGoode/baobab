import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnInit {
  constructor() { }
  display: boolean = false;
  ngOnInit() {
  }

  public showDialog() {
      this.display = true;
      console.debug("Showing dialog...");
  }
}
