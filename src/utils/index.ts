import { redirect } from './redirect'
const isEmpty = (obj: unknown) => !!obj && Object.keys(obj).length !== 0

export { redirect, isEmpty }
