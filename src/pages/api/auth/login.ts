import { ErrorWithCode } from "./../../../middleware/error";
import middleware from "../../../middleware";
import { getUserByNick } from "../../../db/user";
import { compare } from "bcrypt";

const handler = middleware.post(async (req, res, next) => {
  const { nick, password } = req.body;
  const { db } = req;

  if (!nick || !password) {
    next(new ErrorWithCode({ message: "Fill up all fields", code: 400 }));
  }

  const user = await getUserByNick(db, nick);

  if (!user) {
    next(new ErrorWithCode({ message: "User does not exist", code: 400 }));
  }

  const isAuth = await compare(password, user.password);

  if (!isAuth) {
    next(new ErrorWithCode({ message: "User unauthorized", code: 401 }));
  }

  const { password: userPasssword, ...rest } = user;

  return res.json({ ...rest });
});

export default handler;
