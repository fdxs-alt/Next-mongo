import nc, { withSession } from '@middleware'

const handler = nc.post((req, res) => {
  req.session.destroy()

  return res.json({ success: true })
})

export default withSession(handler)
