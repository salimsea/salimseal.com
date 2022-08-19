import { Header, Footer, Ballon } from "components";
import Head from "next/head";
import React from "react";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>{`${props?.pageTitle} - Salimseal`}</title>
        <meta
          name="google-site-verification"
          content="oq7c1Rw3isVAhud2eLgArWgSZ5q4KQ01lk7icr3n-gw"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${props?.pageDescription}`} />
        <meta
          property="og:image"
          content={`${
            props?.pageImage ||
            "https://user-images.githubusercontent.com/49223890/184792742-185ddb27-fdea-4c0a-b176-67638223f9a0.png"
          }`}
        />
        <meta property="og:title" content={`${props?.pageTitle} - Salimseal`} />
        <meta
          property="og:description"
          content={`${props?.pageContent || props?.pageDescription}`}
        />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div>
        <Ballon />
        <Header {...props} />
        <div>{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
