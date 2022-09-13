/* eslint-disable no-console */
import { SearchContextProps } from 'providers/search-provider/search-context';
import { __SearchContext } from 'providers/search-provider/SearchProvider';
import { useContext, useEffect } from 'react';
import { RecursivePartial } from 'util/commonTypes';

export default function useSearch() {
  const searchContext =
    useContext<RecursivePartial<SearchContextProps>>(__SearchContext);

  useEffect(() => {
    if (!Object.keys(searchContext).length)
      console.warn('not in search context');
  }, [searchContext]);

  return searchContext;
}
