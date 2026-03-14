export interface ObjectStorageService {
  getSignedDownloadUrl(objectKey: string, expiresInSeconds: number): Promise<string>;
}

export class MockObjectStorageService implements ObjectStorageService {
  async getSignedDownloadUrl(objectKey: string, expiresInSeconds: number): Promise<string> {
    const expiresAt = Date.now() + expiresInSeconds * 1000;
    return `https://storage.gamehub.local/files/${objectKey}?sig=demo&exp=${expiresAt}`;
  }
}
