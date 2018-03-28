import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/primeng';
import { TabViewModule} from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule} from 'primeng/primeng'
import { SplitButtonModule} from 'primeng/splitbutton';
import { GrowlModule} from 'primeng/growl';
import { CodeHighlighterModule} from 'primeng/codehighlighter'
import { OverlayPanelModule} from 'primeng/overlaypanel';
import { ToolbarModule} from 'primeng/toolbar';
import { ButtonModule} from 'primeng/button';
import { DialogModule} from 'primeng/primeng'
import { SidebarModule} from 'primeng/sidebar';
import { CardModule} from 'primeng/card';
import { AccordionModule} from 'primeng/accordion';
import { TreeModule} from 'primeng/tree';
import { ContextMenuModule} from 'primeng/contextmenu';
import { TreeNode} from 'primeng/api';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { OrderListModule} from 'primeng/orderlist';
import { AppComponent } from './app.component';
import { TopPanelComponent } from './top-panel/top-panel.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { AppRoutingModule } from './/app-routing.module';
import { HelpBarComponent } from './help-bar/help-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilesViewComponent } from './files-view/files-view.component';
import { FilesTreeComponent } from './files-tree/files-tree.component';
import { FileDetailComponent } from './file-detail/file-detail.component';
import { FilesServiceService } from './files-service.service'
import { HttpClientModule } from '@angular/common/http';
import {EditorModule} from 'primeng/editor';
import {PasswordModule} from 'primeng/password';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthenticatorService } from './authenticator.service';
import { AuthenticatorServiceBase} from "./authenticator/authenticatorservice.model";
import { AuthorisationService } from "./authenticator/authorisation.service";
import { MessageService} from 'primeng/components/common/messageservice';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
@NgModule({
  declarations: [AppComponent, TopPanelComponent, HelpDialogComponent, HelpBarComponent, DashboardComponent, FilesViewComponent, FilesTreeComponent, FileDetailComponent, AuthenticatorComponent, LoginDialogComponent, CreateDialogComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    PanelModule,
    TabViewModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    SplitButtonModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    SidebarModule,
    CardModule,
    AccordionModule,
    AppRoutingModule,
    TreeModule,
    ContextMenuModule,
    TabViewModule,
    InputTextareaModule,
    OrderListModule,
    HttpClientModule,
    EditorModule,
    PasswordModule,
    GrowlModule,
    ConfirmDialogModule
    
  ],
  providers: [ConfirmationService, AuthorisationService,FilesServiceService, MessageService, {provide: AuthenticatorServiceBase, useClass: AuthenticatorService}],
  bootstrap: [AppComponent]
})
export class AppModule {}
