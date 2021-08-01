// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../styles/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <script
            defer
            data-domain='morpher.vercel.app'
            src='https://plausible.io/js/plausible.js'
          ></script>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
