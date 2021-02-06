import { Db } from 'mongodb'

interface Chceckout {
  userId: string
  bookId: string
  prolonged: boolean
  checkoutDate: Date
  returnDate: Date
}

const createCheckout = async (db: Db) => {}
const removeCheckout = async (db: Db) => {}
const prolongCheckout = async (db: Db) => {}

export { createCheckout, removeCheckout, prolongCheckout }
