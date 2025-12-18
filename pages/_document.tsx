import { DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import i18nextConfig from '../next-i18next.config';

type Props = DocumentProps & {
  // add custom document props
};

export default function Document(props: Props) {
  const currentLocale =
    props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <title>NVBot Evaluation</title>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/svg+xml" href="tab-icon.svg" />
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="height=device-height ,width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <body className="font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
