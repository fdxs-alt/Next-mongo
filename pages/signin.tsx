import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import {
  wrapper,
  wrapper__logo,
  wrapper__log,
} from "../styles/signin.module.scss";
import Layout from "../components/Layout";
import Image from "next/image";
const Signin = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  console.log(session)
  useEffect(() => {
    if (session) {
      router.push("/main");
    }
  }, [session, router]);

  return (
    <Layout>
      <section className={wrapper}>
        <div className={wrapper__logo}>
          <h1>Postly.</h1>
          <h4>Only tool you need.</h4>
          <h4>Ever.</h4>
        </div>
        <div className={wrapper__log}>
          <button onClick={() => signIn("github")}>
            <Image src="/logo.png" alt="" width="20" height="20" />
            <p>
              Log in with <b>github</b>
            </p>
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Signin;
