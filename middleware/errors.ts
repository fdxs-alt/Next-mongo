import { NextApiResponse } from "next";
export default async function onError(error, req, res: NextApiResponse, next) {
  console.log(error);
  res.status(500).end();
}
