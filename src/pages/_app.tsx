import App from "next/app";
import type { AppProps, AppContext } from 'next/app'
import { AuthContextProvider, User } from "@ctx";

interface InitalAppProps extends AppProps {
  user?: User;
  accessToken?: string
}
function MyApp({ Component, pageProps, user }: InitalAppProps) {
  return (
    <AuthContextProvider initalUser={user}>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}


MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const data = await fetch('http://localhost:3000/api/auth/refresh', { method: "POST", credentials: "include" })
  const initalData = await data.json()

  return { ...appProps, ...initalData }
}

export default MyApp;
