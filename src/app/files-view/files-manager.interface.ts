export interface FilesViewManager {
    saveFile();
    createFile(fileName:string);
    deleteFile();
    deleteDir();
    createDirectory(fileName:string);
    edited():boolean;
    getCurrentId():string;
}