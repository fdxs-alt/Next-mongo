import { MulterFile } from '@db'
import { S3 } from 'aws-sdk'

export class FileUpload {
  s3: S3
  file: MulterFile
  bucket: string

  constructor(file: MulterFile) {
    const { ACCESS_KEY, SECRET_KEY, BUCKET_NAME } = process.env
    this.s3 = new S3({
      credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
    })
    this.file = file
    this.bucket = BUCKET_NAME
  }

  upload() {
    return this.s3
      .upload({
        Bucket: this.bucket,
        Key: String(Date.now()),
        Body: this.file.buffer,
        ACL: 'public-read',
      })
      .promise()
  }
}
