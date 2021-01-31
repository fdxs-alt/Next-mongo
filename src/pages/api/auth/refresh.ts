import { ObjectID } from "mongodb";
import { JwtData, decodeJwtToken, getUserById, createJwtToken } from "@db";
import { sendRefreshCookie, REFRESH_TYPE, ACCESS_TYPE } from "@utils";
import nc from "@middleware";

const handler = nc.post(async (req, res) => {
  const refreshToken = req.cookies.jrc;

  if (!refreshToken) {
    return res.json({ user: null, accessToken: null });
  }

  try {
    const decoded = (await decodeJwtToken(refreshToken, REFRESH_TYPE)) as {
      id: ObjectID;
      iat: number;
      exp: number;
    };
    const user = await getUserById(req.db, decoded.id);

    if (!user) {
      return res.json({ user: null, accessToken: null });
    }

    const { password: _, ...rest } = user;

    sendRefreshCookie(res, createJwtToken(rest, REFRESH_TYPE));

    return res.json({
      user: rest,
      accessToken: createJwtToken(rest, ACCESS_TYPE),
    });
  } catch (error) {
    return res.json({ user: null, accessToken: null });
  }
});

export default handler;
