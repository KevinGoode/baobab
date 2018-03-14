import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode} from 'primeng/api';
import { MenuItem} from 'primeng/api';
import { ServerFile } from '../server-file';

@Component({
  selector: 'app-files-tree',
  templateUrl: './files-tree.component.html',
  styleUrls: ['./files-tree.component.css']
})
export class FilesTreeComponent implements OnInit {
  constructor(private router:Router) {
    this.router = router;
   }
  files : TreeNode[];
  selectedFile : TreeNode;
  contextMenuItems: MenuItem[];
  ngOnInit() {
    this.contextMenuItems = [];
  }  
 
  setAllFiles(serverFiles: ServerFile[]){
    this.files = new Array<TreeNode>();
    for (var i=0;i<serverFiles.length;i++){
      var treeNode: TreeNode = this.convertToTreeNode(serverFiles[i]);
      this.files.push(treeNode);
    }
   
  }
  showSelectedNodeInTree(){
    this.expandFromSelectedNodeUp(this.selectedFile);
  }
  setContextMenu(){
    if(this.selectedFile){
      var currentFile: ServerFile = this.selectedFile.data;
      if (currentFile){
        if(currentFile.isDir){
          this.contextMenuItems =this.DIRECTORY_MENU_ITEMS;
        }else{
          this.contextMenuItems =this.FILE_MENU_ITEMS;
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
  new_file()
  {
    alert("New file - Not yet implemented");
  }
  new_directory(){
    alert("New dir  - Not yet implemented");
  }
  delete_directory(){
    alert("Delete  dir - Not yet implemented");
  }
  copy_file(){
    alert("Copy file - Not yet implemented");
  }
  edit_file(){
    alert("Edit file - Not yet implemented");
  }
  delete_file(){
    alert("Delete file - Not yet implemented");
  }
  fileSelect(event){
    var encoded :string = btoa(event.node.data.id);
    var url: string= "files?detail=" + encodeURIComponent(encoded);
    this.router.navigateByUrl(url);
  }
  private convertToTreeNode(serverFile: ServerFile): TreeNode{
    var treeNode = {label:'', data: null, expandedIcon:'', collapsedIcon:'', icon:'', children:[]}
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
  private expandFromSelectedNodeUp(node){
    if(node){
      node.expanded=true;
      this.expandFromSelectedNodeUp(node.parent);
    }
  }

  DIRECTORY_MENU_ITEMS: MenuItem[]=[{label: 'New File', icon: 'fa-file', command:this.new_file},
                                          {label: 'New Directory', icon: 'fa-plus', command:this.new_directory},
                                          {label: 'Delete Directory', icon: 'fa-trash', command:this.delete_directory}];
  FILE_MENU_ITEMS: MenuItem[]=[{label: 'Copy File', icon: 'fa-copy', command:this.copy_file},
                               {label: 'Edit File', icon: 'fa-edit', command:this.edit_file},
                               {label: 'Delete File', icon: 'fa-trash', command:this.delete_file}];
}

