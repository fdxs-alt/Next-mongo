import { redirect } from './redirect'
import { uploadFile } from './s3'
const isEmpty = (obj: unknown) => !!obj && Object.keys(obj).length !== 0

export { redirect, isEmpty, uploadFile }
