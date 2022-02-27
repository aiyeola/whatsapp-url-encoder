import Document, { Html, Head, Main, NextScript } from 'next/document';

class document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#128c7e" />
          <meta name="application-name" content="Digital Circle" />
          <meta name="apple-mobile-web-app-title" content="Digital Circle" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#128c7e" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta httpEquiv="x-ua-compatible" content="ie-edge" />
          <meta property="og:locale" content="en_GB" />
          {/* <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" /> */}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default document;
