import { Readable } from 'stream';
import mongoose from 'mongoose';

export const getFileAsStream = async (fileId: string): Promise<any> => {
  try {
    const id = new mongoose.Types.ObjectId(fileId);
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'inlineAttachments',
    });
    return bucket.openDownloadStream(id!);
  } catch (error) {
    console.log(error);
  }
};

export const saveFilesToDb = async ({ buffer, fileName }: { buffer: any; fileName: any }): Promise<any> => {
  return new Promise((resolve, reject) => {
    const readablePhotoStream = new Readable();
    readablePhotoStream.push(buffer);
    readablePhotoStream.push(null);
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'inlineAttachments',
    });

    const uploadStream = bucket?.openUploadStream(fileName);
    const id = uploadStream?.id;
    if (uploadStream) {
      readablePhotoStream.pipe(uploadStream);
    }

    uploadStream?.on('error', (err: Error) => {
      return reject({ message: err?.message || 'File upload failed mongo' });
    });

    uploadStream?.on('finish', () => {
      return resolve({
        message: `File uploaded successfully, stored under Mongo ObjectID: ${id}`,
        id,
        uploadedFileName: fileName,
      });
    });
  });
};
