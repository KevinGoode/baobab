import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilesViewComponent } from './files-view/files-view.component';
import { DeactivateFilesView } from './files-view/files-deactivate-guard';
import { DashboardComponent }      from './dashboard/dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path:'',component: DashboardComponent},
      //{path:'files',component: FilesViewComponent},
      //{path:'files/:id',component: FilesViewComponent},
      {path:'files',component: FilesViewComponent, canDeactivate: [DeactivateFilesView]}
      

		])
  ],
  exports: [
		RouterModule
	],
  declarations: [],
  providers: [DeactivateFilesView],
})
export class AppRoutingModule { }
