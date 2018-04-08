import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot,} from '@angular/router';
import { FilesViewComponent } from './files-view.component';
@Injectable()
export class DeactivateFilesView implements CanDeactivate<FilesViewComponent> {
  constructor() {}

  canDeactivate(
    component: FilesViewComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) {
    //This callback is invoked when either going back or forward to non files' view (eg home) or
    //When pressing non-files navigation button
    if(component.edited()){
        //This returns a promise
        return component.confirmSaveEdits();
    }
    return true;
  }
}
