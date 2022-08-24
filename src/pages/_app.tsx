import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import client from '../clients/apollo-client';
import '../styles/bootstrap.min.css';
import '../styles/now-ui-kit.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
