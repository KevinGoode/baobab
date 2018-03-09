export class ServerFile {
    constructor(all:any){
        this.id = all.id;
        this.name = all.name;
        this.isDir = all.isDir;
        this.sizeOnDisk = all.sizeOnDisk;
        this.lastReadAt = new Date(all.lastReadAt);
        this.lastUpdated = new Date(all.updatedAt);
        this.children = new Array<ServerFile>();
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
}
