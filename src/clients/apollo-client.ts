import { ApolloClient, InMemoryCache } from '@apollo/client';

const serverEndpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

if (!serverEndpoint)
  throw new Error('The NEXT_PUBLIC_SERVER_ENDPOINT variable must be defined');

const client = new ApolloClient({
  uri: serverEndpoint,
  cache: new InMemoryCache(),
  ssrMode: false // TODO: check what to do here
});

export default client;
