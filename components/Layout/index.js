import { Header, Footer, Ballon } from "components";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

const Layout = (props) => {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${
    router.asPath === "/" ? "" : router.asPath.split("?")[0]
  }`;

  const defaultOgImage =
    "https://user-images.githubusercontent.com/49223890/184792742-185ddb27-fdea-4c0a-b176-67638223f9a0.png";

  return (
    <>
      <Head>
        <title>{`${props?.pageTitle} - Salimseal`}</title>
        <meta
          name="google-site-verification"
          content="oq7c1Rw3isVAhud2eLgArWgSZ5q4KQ01lk7icr3n-gw"
        />
        <meta name="google-adsense-account" content="ca-pub-3080709829496816" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${props?.pageDescription}`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:image" content={`${props?.pageImage || defaultOgImage}`} />
        <meta property="og:title" content={`${props?.pageTitle} - Salimseal`} />
        <meta
          property="og:description"
          content={`${props?.pageContent || props?.pageDescription}`}
        />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${props?.pageTitle} - Salimseal`} />
        <meta name="twitter:description" content={`${props?.pageDescription}`} />
        <meta name="twitter:image" content={`${props?.pageImage || defaultOgImage}`} />
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
