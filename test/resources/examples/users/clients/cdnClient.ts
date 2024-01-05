//
// GENERATED SOURCE - DO NOT EDIT
//

import * as minio from 'minio';

export class cdnClient {
  private client: minio.Client;

  constructor() {
    this.client = new minio.Client({
      
    });
  }

  public getClient(): minio.Client {
    return this.client;
  }
}