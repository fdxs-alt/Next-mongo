import { decodeJwtToken, getUserById } from "@db";
import { IRequest } from "@middleware";
const authMiddleware = async (req: IRequest, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(" ");
    const decodedToken = await decodeJwtToken(token[1]);
    if (decodedToken) {
      const user = await getUserById(req.db, decodedToken.id);

      req.user = user;
    }
  } catch (error) {}

  return next();
};

export default authMiddleware;
