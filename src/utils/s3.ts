import { MulterFile } from '@db'
import { S3 } from 'aws-sdk'

const uploadFile = (file: MulterFile) => {
  const { ACCESS_KEY, SECRET_KEY, BUCKET_NAME } = process.env
  const s3 = new S3({
    credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  })

  return s3
    .upload({
      Bucket: BUCKET_NAME,
      Key: String(Date.now()),
      Body: file.buffer,
      ACL: 'public-read',
    })
    .promise()
}

export { uploadFile }
