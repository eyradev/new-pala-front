import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { FC, ReactNode } from 'react';
import client from '../clients/apollo-client';
import '../styles/bootstrap.min.css';
import '../styles/now-ui-kit.min.css';

const Noop: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <ApolloProvider client={client}>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
