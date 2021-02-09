import { destroyRefreshCookie } from '@utils'
import nc from '@middleware'

const handler = nc.post((req, res) => {
  destroyRefreshCookie(req, res)
  return res.json({ success: true })
})

export default handler
