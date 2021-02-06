import { NextApiResponse } from 'next'
import { NextApiRequest } from 'next'
export default function (req: NextApiRequest, res: NextApiResponse) {
  res.json({ message: 'message' })
}
