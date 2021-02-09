import nc, { withSession } from '@middleware'

const handler = nc.get((req, res) => {
  const user = req.session.get('user')
  return res.json({ user })
})

export default withSession(handler)
