export interface FilesViewManager {
    saveFile();
    createFile(fileName:string);
    deleteFile();
    renameFile(newName:string);
    moveFile(fromId:string, toId:string );
    deleteDir();
    createDirectory(fileName:string);
    edited():boolean;
    getCurrentId():string;
}