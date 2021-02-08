import nc, { authMiddleware } from '@middleware'

const handler = nc.use(authMiddleware).post((req, res) => {
  if (req.user) {
    console.log('REQ USER:', req.user)
    return res.json({ user: req.user })
  }
  console.log('NO USER')
  return res.json({ user: null })
})

export default handler
