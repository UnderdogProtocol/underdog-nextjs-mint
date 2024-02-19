import { Providers } from "@/components/Providers";
import "@solana/wallet-adapter-react-ui/styles.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Providers>
      <Toaster />

      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}
