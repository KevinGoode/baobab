export class ServerFile {
    constructor(all:any){
        this.id = all.id;
        this.name = all.name;
        this.isDir = all.isDir;
        this.sizeOnDisk = all.sizeOnDisk;
        this.lastReadAt = this.getDate(all.lastReadAt);
        this.lastUpdated = this.getDate(all.lastUpdated);
        this.children = new Array<ServerFile>();
    }
    clone(): ServerFile{
        //Just clones parent object
        return new ServerFile(this);
    }
    public addChild(child: ServerFile){
        this.children.push(child);
    }
    id: string;
    name: string;
    isDir: boolean;
    children: ServerFile[];
    sizeOnDisk: number;
    lastReadAt: Date;
    lastUpdated: Date;
    private getDate(value:any){
        //Clones a date object otherwise tries to contruct new Date
        if (value instanceof Date) return new Date(value.getTime())
        return new Date(value)
    }
}
