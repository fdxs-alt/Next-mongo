import { redirect } from './redirect'

const isEmpty = (obj: unknown) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

export { redirect, isEmpty }
