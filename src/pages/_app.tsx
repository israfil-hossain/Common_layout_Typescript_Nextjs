import type { AppProps } from "next/app";
import "features/style/main.scss";
import "features/style";
import { BlankLayout, NextPageWithLayout } from "features/layouts";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // check if page has any layout defined.
  // assuming dashboard layout as default (most used)
  const getLayout =
    Component.getLayout ??
    ((page) => <BlankLayout {...pageProps}>{page}</BlankLayout>);

  // render the page within default or specified layout
  return <>{getLayout(<Component {...pageProps} />)}</>;
}
