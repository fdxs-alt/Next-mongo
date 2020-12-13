import { NextApiRequest } from "next";
import nc, { IResponse } from "../../middleware/all";

const handler = nc.get((req: NextApiRequest, res: IResponse) => {
  res.json({ message: "Test message" });
});

export default handler;
