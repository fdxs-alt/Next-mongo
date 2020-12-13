import "reflect-metadata";
import { Provider } from "next-auth/client";
import React from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
