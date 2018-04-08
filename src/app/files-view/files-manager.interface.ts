export interface FilesViewManager {
    saveFile();
    createFile(fileName:string);
    deleteFile();
    createDirectory(fileName:string);
    edited():boolean;
    getCurrentId():string;
}