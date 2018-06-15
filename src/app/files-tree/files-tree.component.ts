import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode} from 'primeng/api';
import { MenuItem} from 'primeng/api';
import { ServerFile } from '../server-file';
import { AuthorisationService, HeartbeatDetails } from '../authenticator/authorisation.service';
import {OverlayPanel} from 'primeng/overlaypanel'
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {FilesViewManager } from '../files-view/files-manager.interface'
import {CreateDialogComponent } from '../create-dialog/create-dialog.component'
import {TreeDragDropService} from 'primeng/api';
@Component({
  selector: 'app-files-tree',
  templateUrl: './files-tree.component.html',
  styleUrls: ['./files-tree.component.css'],
  providers:[TreeDragDropService]
})
export class FilesTreeComponent implements OnInit {
  constructor(private router:Router, private loginlogoutService:AuthorisationService, private confirmationService: ConfirmationService) {
    this.router = router;
   }
  @ViewChild('helpEnableEditing') helpEnableEditing :OverlayPanel;
  @ViewChild('helpDisableEditing') helpDisableEditing :OverlayPanel;
  @ViewChild('createDialog') createDialog: CreateDialogComponent;
  @Input() parent : FilesViewManager;
  draggableNodes:boolean =false;
  files : TreeNode[];
  selectedFile : TreeNode;
  contextMenuItems: MenuItem[];
  private loggedIn: boolean = false;
  ngOnInit() {
    this.contextMenuItems = [];
    //Register interest in future login/logout events
    this.loginlogoutService.loginEvents.subscribe(userName=>{
      this.enableDragandDrop(true);
      this.loggedIn = true;
      this.setContextMenu();
    });
    this.loginlogoutService.logoutEvents.subscribe(()=>{
      this.enableDragandDrop(false);
      this.loggedIn = false;
      this.setContextMenu();
    });
    this.loginlogoutService.logoutWarningEvents.subscribe((heartbeatDetails)=>{
      var expiry: number = heartbeatDetails.getExpiry();
      this.autoSave(heartbeatDetails)
      this.autoSaveBeforeLogout(heartbeatDetails);
      this.confirmAutoSaveBeforeLogout(expiry);
      
    });
    //Get current login status
    this.loggedIn = this.loginlogoutService.isUserLoggedIn();
    this.setContextMenu();
    this.enableDragandDrop(this.loggedIn);
  }  
 
  setAllFiles(serverFiles: ServerFile[]){
    this.files = new Array<TreeNode>();
    for (var i=0;i<serverFiles.length;i++){
      var treeNode: TreeNode = this.convertToTreeNode(serverFiles[i]);
      this.files.push(treeNode);
    }
   
  }
  showSelectedNodeInTree(){
    this.expandFromRootNodeDown(this.selectedFile);
  }
  setContextMenu(){
    if(this.selectedFile){
      var currentFile: ServerFile = this.selectedFile.data;
      if (currentFile){
        if(currentFile.isDir){
          if(this.loggedIn){
              this.contextMenuItems =this.DIRECTORY_MENU_ITEMS;
          }else{
            this.contextMenuItems =this.DIRECTORY_MENU_ITEMS_DISABLED;
          }
        }else{
          if(this.loggedIn){
              this.contextMenuItems =this.FILE_MENU_ITEMS;
          }else{
            this.contextMenuItems = this.FILE_MENU_ITEMS_DISBABLED;
          }
        }
      }
    }
  }
  clearNodeEditing(id:string){
    //Need to set last selected node type to blank to switch off editing mode
    //and reset label in the case that it was edited but not saved
    var node:TreeNode = null;
    if(this.files && id !=""){
      for(var i=0;i<this.files.length;i++){
           node = this.findItemById(id, this.files[i]);
           if(node){
               node.type="";
               node.label=this.getLabelFromId(id);
               break;
           }
          }
      }
  }
  selectItemInTree(id:string){
    var node:TreeNode = null;
    if(this.files){
      for(var i=0;i<this.files.length;i++){
           node = this.findItemById(id, this.files[i]);
           if(node){
               this.selectedFile=node;
               break;
           }
          }
      }
  }
  getFileDataById(id:string): ServerFile{
    var serverFile: ServerFile =null;
    if (this.files){
      var treeNode: TreeNode = this.findItemById(id,this.files[0]);
      if(treeNode){
        serverFile=treeNode.data;
      }
    }
    return serverFile;
  }
  save_file()
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to save article?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.parent.saveFile();
      }
  });
  }
  new_file()
  {
    this.createDialog.showDialog(this.parent);
  }
  new_directory(){
    this.createDialog.showDialog(this.parent, true);
  }
  delete_directory(){
    this.confirmationService.confirm({message: this.DELETE_DIR,
      accept: () => {//Save then allow navigate
                     this.parent.deleteDir();
                     }
    });
  }
  rename(){
    this.parent.renameFile(this.selectedFile.label);
  }
  rename_file(){
    if(this.selectedFile){
        this.selectedFile.type="editable";
    }
  }
  delete_file(){
    this.confirmationService.confirm({message: this.DELETE_FILE,
      accept: () => {//Save then allow navigate
                     this.parent.deleteFile();
                     }
    });
  }
  onNodeDrop(event){
    var dragNodeName=this.getLabelFromId(event.dragNode.data.id);
    var dropDir=event.dropNode.data.id;
    this.parent.moveFile(event.dragNode.data.id,dropDir+"/"+dragNodeName);
  }
  fileSelect(event){
    if(this.idHasChanged(event)){
      this.selectFile(event.node.data.id);
    }
  }
  
  selectFile(id:string){
    var encoded :string = btoa(id);
    var url: string= "files?detail=" + encodeURIComponent(encoded);
    this.router.navigateByUrl(url);
    
  }
  confirmSaveEdits(prefix):Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.confirmationService.confirm({message: prefix + this.SAVE_EDITS,
        accept: () => {//Save then allow navigate
                       this.parent.saveFile();
                       resolve(true);},
        reject: () => {//Allow navigate
                       resolve(true);}
      });
  }
  );
  }
  idHasChanged(event):boolean{
    return (event.node.data.id != this.parent.getCurrentId());
  }
  disable_editing(event:any){
    this.helpDisableEditing.show(event.originalEvent,event.originalEvent.currentTarget);
  }
  enable_editing(event:any){
    this.helpEnableEditing.show(event.originalEvent, event.originalEvent.currentTarget);
  }
  private convertToTreeNode(serverFile: ServerFile): TreeNode{
    var treeNode :TreeNode = { label:'', data: null, expandedIcon:'', collapsedIcon:'', icon:'', children:[]}
    treeNode.label = serverFile.name;
    treeNode.data = serverFile;
    if(serverFile.isDir){
      treeNode.expandedIcon = "fa-folder-open";
      treeNode.collapsedIcon = "fa-folder";
      treeNode.draggable=false;
      treeNode.droppable=true;
    }else{
      treeNode.icon = "fa-file-text";
      treeNode.draggable=true;
      treeNode.droppable=false;
    }
    for (var i=0 ;i<serverFile.children.length;i++){
       var childNode: TreeNode=this.convertToTreeNode(serverFile.children[i]);
       treeNode.children.push(childNode);
    }
    return treeNode;
  }
  private findItemById(id:string, node:TreeNode): TreeNode{
    if(node.data.id==id){
        return node; 
    }
     for(var i=0;i<node.children.length;i++){
       var currentNode:TreeNode = this.findItemById(id, node.children[i]);
       if (currentNode) return currentNode
     }
    return null;
 }
 /*
 This functions assumes node has aready been found in tree so goes directly down
 tree expanding items. NOTE Expand up does not work on a fresh tree because node parent is
 not set internally until after navigate down tree
 */
 private expandFromRootNodeDown(targetNode:TreeNode){
   if(targetNode){
    //Get trimmed Id
    var targetId=this.removeRootNodeFromId(targetNode.data.id);
    //Expand root node
    this.files[0].expanded=true;
    //Now expand down
    this.findChild(this.files[0],targetId, true)
   }
 }
 /*
    Finds child by noting that fullChildName is path of child in tree
    and name is unique name of node at that level. Code searches from currentNode's children
    down checking that name is equal to oldest ancestor. If finds oldest ancestor, code removes
    oldest ancestor from fullChildName and finds the next oldest ancestor and so on.
 */
 private findChild(currentNode:TreeNode, fullChildName:string, withExpansion:boolean):TreeNode{
    var childNode:TreeNode =undefined;
    var allAncestors:string[]=fullChildName.split("/");
    for(var i=0;i<currentNode.children.length;i++){
        if(currentNode.children[i].data.name==allAncestors[0]){
          childNode=currentNode.children[i];
           if(withExpansion) childNode.expanded=true;
           if(allAncestors.length>1){
             childNode = this.findChild(childNode,this.removeOldestAncestor(fullChildName), withExpansion);
           }
        }
    }
    return childNode;
 }
 private enableDragandDrop(enabled:boolean){
    this.draggableNodes=enabled;
 }
 private getLabelFromId(id:string){
    var lastIndex=id.lastIndexOf("/")+1;
    return id.substring(lastIndex);
 }
 private removeRootNodeFromId(id:string):string{
    //Remove leading "./" then root node
    var newId=this.removeOldestAncestor(id);
    newId=this.removeOldestAncestor(newId);
    return newId;
 }
 private confirmAutoSaveBeforeLogout(expiry:number){
  //User always get asked on minute before logout.
  //This could be too late so user can configure auto save (without confirmation) before logout
  if(!isNaN(expiry)){
    if(expiry < 60){
        if(this.parent.edited()){
          this.confirmSaveEdits(this.AUTO_LOGOUT);
        }
    }
  }
}
private autoSave(details:HeartbeatDetails){
  if (details.doAutoSave() && this.parent.edited()){
    var currentTime: number = new Date().getTime();
    var nextSave: number = currentTime + details.getAutoSaveFrequency();
      if (this.nextSaveTime){
        if (this.nextSaveTime < currentTime){
          this.parent.saveFile();
          this.nextSaveTime = nextSave;
        }
      }else{
        this.nextSaveTime = nextSave;
      }
  }
}
private autoSaveBeforeLogout(details: HeartbeatDetails){
    if (details.doAutoSaveBeforeLogout() && this.parent.edited()){
      if (details.getExpiry() < details.getTimeBeforeLogoutSave()){
        this.parent.saveFile();
      }
    }
}
 /* 
 For example "grandparent/parent/child" returns "parent/child"
 */
 private removeOldestAncestor(fullChildName:string):string{
    var index=fullChildName.indexOf("/");
    return fullChildName.slice(index+1);
 }
 private nextSaveTime :number = 0;
  DIRECTORY_MENU_ITEMS: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.disable_editing(event);}},
                                    {label: 'New Article', icon: 'fa-file', command:(event)=>{this.new_file();}},
                                    {label: 'New Directory', icon: 'fa-plus', command:(event)=>{this.new_directory();}},
                                    {label: 'Delete Directory', icon: 'fa-trash', command:(event)=>{this.delete_directory();}}
                                    ]
  DIRECTORY_MENU_ITEMS_DISABLED: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.enable_editing(event);}},
                                             {label: 'New Article', icon: 'fa-file', command:(event)=>{this.new_file();} ,disabled:true}, 
                                             {label: 'New Directory', icon: 'fa-plus', command:(event)=>{this.new_directory();},disabled:true},
                                             {label: 'Delete Directory', icon: 'fa-trash', command:(event)=>{this.delete_directory();},disabled:true}]
  FILE_MENU_ITEMS: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.disable_editing(event);}},
                               {label: 'Rename Article', icon: 'fa-save', command:(event)=>{this.rename_file();}},
                               {label: 'Save Article', icon: 'fa-save', command:(event)=>{this.save_file();}},
                               {label: 'Delete Article', icon: 'fa-trash', command:(event)=>{this.delete_file();}}
                               ]
  FILE_MENU_ITEMS_DISBABLED: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.enable_editing(event);}},
                                         {label: 'Rename Article', icon: 'fa-save', command:(event)=>{this.rename_file();}, disabled:true},
                                         {label: 'Save Article', icon: 'fa-save', command:(event)=>{this.save_file();}, disabled:true},
                                         {label: 'Delete Article', icon: 'fa-trash', command:(event)=>{this.delete_file();}, disabled:true},
                                        ]
 private SAVE_EDITS: string = 'You have unsaved edits. Save article?';
 private AUTO_LOGOUT: string = 'Auto logout imminent. ';
 private DELETE_FILE: string = 'Are you sure you want to delete article?';
 private DELETE_DIR: string = 'Are you sure you want to delete directory and all articles inside?';
}

