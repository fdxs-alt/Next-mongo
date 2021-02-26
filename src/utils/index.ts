import { redirect } from './redirect'
import { FileUpload } from './s3'
const isEmpty = (obj: unknown) => !!obj && Object.keys(obj).length !== 0

export { redirect, isEmpty, FileUpload }
