import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default (req: NextApiRequest, res: NextApiResponse) => {
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    database: process.env.PG_DB,
    pages: {
      signIn: "/signin",
    },
  });
};
