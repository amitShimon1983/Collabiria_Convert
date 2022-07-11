import {
  BlobServiceClient,
  ContainerClient,
  BlockBlobClient,
  ContainerCreateIfNotExistsResponse,
} from '@azure/storage-blob';

enum BlobError {
  Success = 'Success',
  Error = 'Error',
  NotExists = 'NotExists',
}

class AzureBlobStorage {
  private static blobServiceClient: BlobServiceClient;

  public static init(connectionString: string) {
    if (!this.blobServiceClient) {
      if (!connectionString) {
        throw new Error('AzureBlobStorageProvider: must supply valid storage connection string and key');
      }
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }
  }

  static getContainerClient(containerName: string): ContainerClient {
    return this.blobServiceClient.getContainerClient(containerName);
  }

  static getBlockBlobClient(containerName: string, blobName: string): BlockBlobClient {
    const containerClient = this.getContainerClient(containerName);
    return containerClient.getBlockBlobClient(blobName);
  }

  public static async createBlobContainer(containerName: string): Promise<ContainerCreateIfNotExistsResponse> {
    const containerClient = this.getContainerClient(containerName);
    return await containerClient.createIfNotExists();
  }

  public static async downloadBlobAsBuffer(containerName: string, blobName: string) {
    const blockBlobClient = this.getBlockBlobClient(containerName, blobName);
    const buffer = await blockBlobClient.downloadToBuffer();
    return buffer;
  }

  public static async uploadFile(blobName: string, containerName: string, data: ArrayBuffer): Promise<string> {
    const blockBlobClient = this.getBlockBlobClient(containerName, blobName);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.byteLength);
    return uploadBlobResponse?.requestId || '';
  }

  public static async generateSasUrl(containerName: string, blobName: string): Promise<string> {
    const blockBlobClient = this.getBlockBlobClient(containerName, blobName);
    const response = await this.isBlobExists(blockBlobClient, containerName, blobName);
    if (response) {
      const expiresOn = new Date();
      expiresOn.setMinutes(expiresOn.getMinutes() + 5);
      const url = await blockBlobClient.generateSasUrl({
        expiresOn,
        permissions: `r` as any,
      });
      return url;
    }
    return BlobError.NotExists;
  }

  private static async isBlobExists(blockBlobClient: BlockBlobClient, containerName: string, blobName: string) {
    let response = false;
    try {
      response = await blockBlobClient.exists();
    } catch (error: any) {
      console.error(`[generateSasUrl] Failed to find blob containerName${containerName}, blobName: ${blobName}`);
    }
    return response;
  }
}

export default AzureBlobStorage;
