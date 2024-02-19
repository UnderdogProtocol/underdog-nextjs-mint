import { ReactElement } from "react";
import { Container } from "../Container";
import { Navbar } from "./Navbar";
import Head from "next/head";
import { Footer } from "./Footer";

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>

      <Container className="min-h-screen">
        <Navbar />
        {children}
      </Container>
      <Footer />
    </>
  );
};

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
