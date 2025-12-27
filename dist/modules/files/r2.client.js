"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createR2Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const createR2Client = () => {
    const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    if (!accountId || !accessKeyId || !secretAccessKey) {
        throw new Error('Missing Cloudflare R2 configuration. Please set CLOUDFLARE_R2_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, and CLOUDFLARE_R2_SECRET_ACCESS_KEY environment variables.');
    }
    return new client_s3_1.S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
};
exports.createR2Client = createR2Client;
//# sourceMappingURL=r2.client.js.map