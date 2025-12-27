export interface IFile {
    id: string;
    fileName: string;
    mimeType: string;
    size: number;
    bucketPath: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}
