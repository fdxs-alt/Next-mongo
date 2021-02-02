import { serialize } from "cookie";
import { NextApiResponse } from "next";
export const sendRefreshCookie = (res: NextApiResponse, token: string) => {
  res.setHeader(
    "Set-Cookie",
    serialize("jrc", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    })
  );
};

export const destroyRefreshCookie = (res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    serialize("jrc", null, {
      httpOnly: true,
      maxAge: 0,
    })
  );
};
