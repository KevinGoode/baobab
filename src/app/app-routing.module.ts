import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilesViewComponent } from './files-view/files-view.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path:'',component: DashboardComponent},
      //{path:'files',component: FilesViewComponent},
      //{path:'files/:id',component: FilesViewComponent},
      {path:'files',component: FilesViewComponent}
      

		])
  ],
  exports: [
		RouterModule
	],
  declarations: []
})
export class AppRoutingModule { }
