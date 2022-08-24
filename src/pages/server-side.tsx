import { gql, useQuery } from '@apollo/client';
import type { NextPage } from 'next';
import { Navbar } from '../components/navbar';

const Home: NextPage = () => {
  const { data: countryQuery } = useQuery(gql`
    query Countries {
      countries {
        code
        name
        emoji
      }
    }
  `);

  if (!countryQuery) return null;
  return <Navbar />;
};

export default Home;
