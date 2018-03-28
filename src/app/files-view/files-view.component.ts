import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FilesServiceService } from '../files-service.service'
import { FilesTreeComponent } from '../files-tree/files-tree.component'
import { FileDetailComponent } from '../file-detail/file-detail.component'
import {FilesViewManager } from './files-manager.interface'
import { ServerFile } from '../server-file';
import { MessageService} from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-files-view',
  templateUrl: './files-view.component.html',
  styleUrls: ['./files-view.component.css']
})
export class FilesViewComponent implements OnInit, FilesViewManager{
  @ViewChild('fileTree') navTree: FilesTreeComponent;
  @ViewChild('fileDetail') detail: FileDetailComponent;
  private currentId:string="";
  constructor(private messageService: MessageService, private filesService: FilesServiceService, private router:Router,  private activatedRoute: ActivatedRoute) { 

    console.log("CONSTRUCTOR");
    /*
    //THIS CODE COULD BE USEFUL FOR HANDLING ALL ROUTER EVENTS. IF NOT THEN REMOVE private router:Router and Router from Import
        this.router = router;
    this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      alert("Route");
      this.route();
    }
    
  });
  */
  }
  routerOnActivate(event){
    if (event instanceof NavigationEnd) {
    this.route(decodeURIComponent(this.router.url));
    }
  }
  ngOnInit() {
    console.log("INIT");
    this.activatedRoute.url.subscribe(url =>{
      this.route(decodeURIComponent(this.router.url));
    });
  }
  ngAfterViewInit() {
    
  }
  
  route(url){
    var ID_IDENTIFIER = "/files?detail=";
    if (url.includes(ID_IDENTIFIER)){
      var encodedId=url.replace(ID_IDENTIFIER,"");
      this.currentId = atob(encodedId);
      var  file:ServerFile =this.getFileDataById(this.currentId);
      if (file){
        this.setAllSingleFileDetails(this.currentId ,file);
      }else{
        //Tree is either empty (User presses f5 with detail set) or file added or deleted
        //In this case get file tree and then set stuff
        //TODO When get here then navigate forwards using browser buttons tree is not updated correctly
        this.setFileTree();
      }
    }else{
        this.setFileTree();
     }
  }
  createFile(fileName:string){
    this.currentId=this.currentId+"/"+fileName;
    this.filesService.createFile(this.currentId, "<p>Empty File</p>").subscribe(output=>{
      //Send message and refresh tree
      this.messageService.add({severity:'success', summary:'New File', detail:'Successfully create file'});
      this.setFileTree();
         }), err=>{
          this.currentId="";
          this.messageService.add({severity:'error', summary:'New File', detail:'Error creating file'});}
  }
  creatDirectory(folderName:string){

  }
  saveFile(){
    this.filesService.editFile(this.currentId,this.detail.tabContentText).subscribe(output=>{
      this.messageService.add({severity:'success', summary:'Saved File', detail:'Successfully saved file'})
         }), err=>{
          this.messageService.add({severity:'error', summary:'Saved File', detail:'Error saving file'});}
  }
  private setAllSingleFileDetails(id:string, file:ServerFile){
    this.setSingleFileDetail(id,file);
    this.selectItemInTree(id);
    this.showSelectedNodeInTree();
  }
  private setSingleFileDetail(id:string, file:ServerFile){
    this.filesService.getFile(id).subscribe(content=>{
    this.detail.setTitle(id);
    if(!file.isDir){
      this.detail.setFileContent(content);
      this.detail.setFileSummary(file);
    }else{
      this.detail.setDirContents(file);
      this.detail.setDirSummary(this.getSubStorage(file));
    }
    this.navTree.setContextMenu()}
    );
  }
  private setFileTree(){
    this.filesService.getAllFiles().subscribe(serverFiles=>{
    var fileRoot: ServerFile = this.getChild(serverFiles);
    this.navTree.setAllFiles([fileRoot]);
    //If can find currentId then set 
    var  file:ServerFile =this.getFileDataById(this.currentId);
    if (file) this.setAllSingleFileDetails(this.currentId ,file);
    });
  }
  private selectItemInTree(id:string){
    this.navTree.selectItemInTree(id);
  }
  private showSelectedNodeInTree(){
    this.navTree.showSelectedNodeInTree();
  }
  private getFileDataById(id:string): ServerFile{
    return this.navTree.getFileDataById(id);
  }
  private getSubStorage(dir:ServerFile):ServerFile{
    var stats = dir.clone();
    stats.lastUpdated = new Date(0);
    stats.lastReadAt = new Date(0);
    stats.sizeOnDisk = 0;
    this.getDirStats(dir, stats);
    return stats
  }
  private getDirStats(dir:ServerFile, stats:ServerFile){
    for (var i=0;i<dir.children.length;i++){
      if (!dir.children[i].isDir){
        //All directory statisitics relate to files inside folder or subfolders
         stats.sizeOnDisk += dir.children[i].sizeOnDisk;
        if (dir.children[i].lastReadAt.getTime()>stats.lastReadAt.getTime()){
          stats.lastReadAt = new Date(dir.children[i].lastReadAt.getTime());
        }
        if (dir.children[i].lastUpdated.getTime()>stats.lastUpdated.getTime()){
          stats.lastUpdated = new Date(dir.children[i].lastUpdated.getTime());
        }
      }else{
        this.getDirStats(dir.children[i], stats);
      }
     
    }

  }
  protected getChild(child: any): ServerFile{
    var childFile :ServerFile = new ServerFile(child);
    for(var i=0;i<child.children.length;i++){
       childFile.addChild(this.getChild(child.children[i]));
    }
    return childFile;
}
}
