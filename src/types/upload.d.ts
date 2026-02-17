/**
 * Type for file uploads (Multer). Use this instead of Express.Multer.File
 * to avoid global namespace issues with @types/express and moduleResolution nodenext.
 */
export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
  stream?: NodeJS.ReadableStream;
}
