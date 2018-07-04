import { Component, OnInit} from '@angular/core';
import { UserSettingsProvider} from '../authenticator/login-credentials.interface';
import { AuthorisationService } from '../authenticator/authorisation.service';
import { AuthenticatorServiceBase} from "../authenticator/authenticatorservice.model";
import { MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit, UserSettingsProvider {

  constructor(private messageService: MessageService,private loginlogoutService:AuthorisationService, private authenticatorService: AuthenticatorServiceBase) { }
  name: string = "Edit User Settings";
  display: boolean = false;
  autoSave: boolean = true;
  logOutSave: boolean = true;
  moveArticle: boolean =false;
  autoSaveSeconds: number =50;
  autoSaveBeforeLogOutSeconds:  number =50;
  gotCurrentSettings:boolean =false;
  ngOnInit() {
    
      //Register interest in future login/logout events
      this.loginlogoutService.logoutWarningEvents.subscribe ((heartbeatDetails)=>{
        if(!this.display || !this.gotCurrentSettings){
          if(heartbeatDetails){
            this.autoSave = heartbeatDetails.doAutoSave();
            this.logOutSave =heartbeatDetails.doAutoSaveBeforeLogout();
            this.moveArticle=!heartbeatDetails.isMoveLocked();
            this.autoSaveBeforeLogOutSeconds=heartbeatDetails.getTimeBeforeLogoutSave();
            this.autoSaveSeconds=heartbeatDetails.getAutoSaveFrequency();

            this.gotCurrentSettings = true;
          }
        }
        
      });
      this.loginlogoutService.loginEvents.subscribe ((name)=>{
        this.name = "Edit User Settings: " + name;
      });
      
  }
  public show(){
    this.display = true;
    console.debug("Showing settings dialog...");
  }
  public OnSave(){
    
      this.authenticatorService.setSettings(!this.moveArticle,this.autoSave,this.autoSaveSeconds,this.logOutSave,this.autoSaveBeforeLogOutSeconds).subscribe(data=>{
        this.messageService.add({severity:'success', summary:'Settings', detail:'Saved settings'});
        this.OnCancel();    
      },err=>{
        this.messageService.add({severity:'error', summary:'Settings', detail:'Error saving settings'}) 
        this.OnCancel();   
      });
   
  }
  public OnCancel(){
    this.gotCurrentSettings = false;
    this.display=false;
  }
}
