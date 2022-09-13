import SearchFilter from 'components/search-filter/SearchFilter';
import { StandardLayout } from 'layouts';
import SearchProvider from 'providers/search-provider/SearchProvider';

const Search = () => {
  const pp = 'hi';
  return (
    <SearchProvider>
      <SearchFilter />
      {pp}
    </SearchProvider>
  );
};

Search.Layout = StandardLayout;
export default Search;
