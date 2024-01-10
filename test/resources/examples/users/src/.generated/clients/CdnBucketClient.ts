//
// GENERATED SOURCE - DO NOT EDIT
//

import type { Readable } from 'stream';
import * as minio from 'minio';
import { ConfigProvider, ResourceInfo } from '@kapeta/sdk-config';

export const RESOURCE_TYPE = 'kapeta/resource-type-cloud-bucket';
export const PORT_TYPE = 'http';
export const RESOURCE_NAME = 'cdnBucket';
export const BUCKET_NAME = 'cdn-bucket';

export async function createCdnBucketClient(config: ConfigProvider): Promise<CdnBucketClient> {
    const resourceInfo = await config.getResourceInfo(RESOURCE_TYPE, PORT_TYPE, BUCKET_NAME);
    if (!resourceInfo) {
        throw new Error(`Could not find resource info for ${RESOURCE_TYPE}#${PORT_TYPE} ${BUCKET_NAME}`);
    }
    return new CdnBucketClient(resourceInfo);
}

export class CdnBucketClient {
    /**
     * The underlying minio client. Use this if you need to access the minio client directly.
     * Remember to pass the BUCKET_NAME as the first argument to all methods.
     */
    public minio: minio.Client;

    constructor(config: ResourceInfo) {
        if (!config.credentials) {
            throw new Error(`Missing credentials for ${config.type}#${config.port}`);
        }

        this.minio = new minio.Client({
            endPoint: config.host,
            port: parseInt(`${config.port}`, 10),
            useSSL: false,
            accessKey: config.credentials.username,
            secretKey: config.credentials.password,
        });
    }

    public async listObjects(): Promise<minio.BucketItem[]> {
        const objects = await this.minio.listObjectsV2(BUCKET_NAME, '', true);
        return objects.toArray();
    }

    public async getObject(objectPath: string): Promise<Readable> {
        return this.minio.getObject(BUCKET_NAME, objectPath);
    }

    public async putObject(objectPath: string, data: Buffer): Promise<minio.UploadedObjectInfo> {
        return this.minio.putObject(BUCKET_NAME, objectPath, data);
    }
}
