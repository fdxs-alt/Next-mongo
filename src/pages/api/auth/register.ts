import middleware, { ErrorWithCode } from "@middleware";
import { createUser, getUserByEmailOrNick } from "@db";

const handler = middleware.post(async (req, res, next) => {
  const { nick, password, email } = req.body;

  const { db } = req;

  if (!nick || !password || !email) {
    next(new ErrorWithCode({ message: "Fill up all fields", code: 400 }));
  }

  const users = await getUserByEmailOrNick(db, nick, email);

  if (users.length) {
    next(
      new ErrorWithCode({
        message: "User which such credentials already exists",
        code: 400,
      })
    );
  }

  const { insertedId } = await createUser(db, { email, password, nick });

  return res.json({ email, nick, _id: insertedId });
});

export default handler;
