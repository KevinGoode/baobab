export interface FilesViewManager {
    saveFile();
    createFile(fileName:string);
    createDirectory(fileName:string);
    edited():boolean;
    getCurrentId():string;
}