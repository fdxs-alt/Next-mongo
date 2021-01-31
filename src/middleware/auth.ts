import { ACCESS_TYPE } from "@utils";
import { decodeJwtToken, JwtData } from "@db";
import { IRequest } from "@middleware";
const authMiddleware = async (req: IRequest, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(" ")[1];
    const decodedToken = (await decodeJwtToken(token, ACCESS_TYPE)) as JwtData;
    if (decodedToken) {
      const { exp: _, iat: __, ...rest } = decodedToken;
      req.user = rest;
    }
  } catch (error) {}

  return next();
};

export default authMiddleware;
