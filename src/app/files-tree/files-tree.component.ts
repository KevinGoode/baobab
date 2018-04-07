import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode} from 'primeng/api';
import { MenuItem} from 'primeng/api';
import { ServerFile } from '../server-file';
import { AuthorisationService } from '../authenticator/authorisation.service';
import {OverlayPanel} from 'primeng/overlaypanel'
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {FilesViewManager } from '../files-view/files-manager.interface'
import {CreateDialogComponent } from '../create-dialog/create-dialog.component'
@Component({
  selector: 'app-files-tree',
  templateUrl: './files-tree.component.html',
  styleUrls: ['./files-tree.component.css']
})
export class FilesTreeComponent implements OnInit {
  constructor(private router:Router, private loginlogoutService:AuthorisationService, private confirmationService: ConfirmationService) {
    this.router = router;
   }
  @ViewChild('helpEnableEditing') helpEnableEditing :OverlayPanel;
  @ViewChild('helpDisableEditing') helpDisableEditing :OverlayPanel;
  @ViewChild('createDialog') createDialog: CreateDialogComponent;
  @Input() parent : FilesViewManager;

  files : TreeNode[];
  selectedFile : TreeNode;
  contextMenuItems: MenuItem[];
  private loggedIn: boolean = false;
  ngOnInit() {
    this.contextMenuItems = [];
    //Register interest in future login/logout events
    this.loginlogoutService.loginEvents.subscribe(userName=>{
      this.loggedIn = true;
      this.setContextMenu();
    });
    this.loginlogoutService.logoutEvents.subscribe(()=>{
      this.loggedIn = false;
      this.setContextMenu();
    });
    //Get current login status
    this.loggedIn = this.loginlogoutService.isUserLoggedIn();
    this.setContextMenu();
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
    console.log("New dir  - Not yet implemented");
  }
  delete_directory(){
    console.log("Delete  dir - Not yet implemented");
  }
  copy_file(){
    console.log("Copy file - Not yet implemented");
  }
  edit_file(){
    console.log("Edit file - Not yet implemented");
  }
  delete_file(){
    console.log("Delete file - Not yet implemented");
  }
  fileSelect(event){
    var encoded :string = btoa(event.node.data.id);
    var url: string= "files?detail=" + encodeURIComponent(encoded);
    this.router.navigateByUrl(url);
  }
  disable_editing(event:any){
    this.helpDisableEditing.show(event.originalEvent);
  }
  enable_editing(event:any){
    this.helpEnableEditing.show(event.originalEvent);
  }
  private convertToTreeNode(serverFile: ServerFile): TreeNode{
    var treeNode :TreeNode = { label:'', data: null, expandedIcon:'', collapsedIcon:'', icon:'', children:[]}
    treeNode.label = serverFile.name;
    treeNode.data = serverFile;
    if(serverFile.isDir){
      treeNode.expandedIcon = "fa-folder-open";
      treeNode.collapsedIcon = "fa-folder";
    }else{
      treeNode.icon = "fa-file-text";
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
 private removeRootNodeFromId(id:string):string{
    //Remove leading "./" then root node
    var newId=this.removeOldestAncestor(id);
    newId=this.removeOldestAncestor(newId);
    return newId;
 }
 /* 
 For example "grandparent/parent/child" returns "parent/child"
 */
 private removeOldestAncestor(fullChildName:string):string{
    var index=fullChildName.indexOf("/");
    return fullChildName.slice(index+1);
 }
  DIRECTORY_MENU_ITEMS: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.disable_editing(event);}},
                                    {label: 'New Article', icon: 'fa-file', command:()=>{this.new_file();}},
                                    {label: 'New Directory', icon: 'fa-plus', command:()=>{this.new_directory();}},
                                    {label: 'Delete Directory', icon: 'fa-trash', command:()=>{this.delete_directory();}}
                                    ]
  DIRECTORY_MENU_ITEMS_DISABLED: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.enable_editing(event);}},
                                             {label: 'New Article', icon: 'fa-file', command:(event)=>{this.new_file();} ,disabled:true}, 
                                             {label: 'New Directory', icon: 'fa-plus', command:(event)=>{this.new_directory();},disabled:true},
                                             {label: 'Delete Directory', icon: 'fa-trash', command:(event)=>{this.delete_directory();},disabled:true}]
  FILE_MENU_ITEMS: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.disable_editing(event);}},
                               {label: 'Save Article', icon: 'fa-save', command:(event)=>{this.save_file();}},
                               {label: 'Copy Article', icon: 'fa-copy', command:this.copy_file},
                               {label: 'Edit Article', icon: 'fa-edit', command:this.edit_file},
                               {label: 'Delete Article', icon: 'fa-trash', command:this.delete_file},
                               ]
  FILE_MENU_ITEMS_DISBABLED: MenuItem[]=[{label: '   Help   ', icon: 'fa-question', command:(event)=>{this.enable_editing(event);}},
                                         {label: 'Save Article', icon: 'fa-save', command:(event)=>{this.save_file();}, disabled:true},
                                         {label: 'Copy Article', icon: 'fa-copy', command:(event)=>{this.copy_file();}, disabled:true},
                                         {label: 'Edit Article', icon: 'fa-edit', command:(event)=>{this.edit_file();}, disabled:true},
                                         {label: 'Delete Article', icon: 'fa-trash', command:(event)=>{this.delete_file();}, disabled:true},
                                        ]
}

