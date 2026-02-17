import type { ERoles } from 'modules/roles/role.types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      role?: ERoles;
    }
    namespace Multer {
      interface File {
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
    }
  }
}

export {};
