import { withIronSession } from 'next-iron-session'

export const withSession = (handler) => {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: 'session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
}
