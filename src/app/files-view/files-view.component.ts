import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FilesServiceService } from '../files-service.service'
import { FilesTreeComponent } from '../files-tree/files-tree.component'
import { FileDetailComponent } from '../file-detail/file-detail.component'
import { ServerFile } from '../server-file';

@Component({
  selector: 'app-files-view',
  templateUrl: './files-view.component.html',
  styleUrls: ['./files-view.component.css']
})
export class FilesViewComponent implements OnInit{
  @ViewChild('fileTree') navTree: FilesTreeComponent;
  @ViewChild('fileDetail') detail: FileDetailComponent;
  constructor(private filesService: FilesServiceService, private router:Router,  private activatedRoute: ActivatedRoute) { 

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
    this.route();
    }
  }
  ngOnInit() {
    console.log("INIT");
    this.activatedRoute.url.subscribe(url =>{
      this.route();
    });
  }
  ngAfterViewInit() {
    
  }
  
  route(){
    var ID_IDENTIFIER = "/files?detail=";
    var url: string =  decodeURIComponent(this.router.url);
    if (url.includes(ID_IDENTIFIER)){
      var encodedId=url.replace(ID_IDENTIFIER,"");
      var id = atob(encodedId);
      var  file:ServerFile =this.getFileDataById(id);
      if (file){
        this.setAllSingleFileDetails(id ,file);
      }else{
        //Tree is either empty (User presses f5 with detail set) or file added or deleted
        //In this case get file tree and then set stuff
        //TODO When get here then navigate forwards using browser buttons tree is not updated correctly
        this.setFileTree();
        file =this.getFileDataById(id);
        if (file) this.setAllSingleFileDetails(id ,file);
      }
    }else{
        this.setFileTree();
     }
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
      this.detail.setDirSummary(file);
    }
    this.navTree.setContextMenu()}
    );
  }
  private setFileTree(){
    this.filesService.getAllFiles().subscribe(serverFiles=>{
    var fileRoot: ServerFile = this.getChild(serverFiles);
    this.navTree.setAllFiles([fileRoot])
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
  protected getChild(child: any): ServerFile{
    var childFile :ServerFile = new ServerFile(child);
    for(var i=0;i<child.children.length;i++){
       childFile.addChild(this.getChild(child.children[i]));
    }
    return childFile;
}
}
