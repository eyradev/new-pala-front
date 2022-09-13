/* eslint-disable no-underscore-dangle */
import { SearchProductsQueryVariables } from 'generated/graphql';
import { isArray } from 'lodash';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import { RecursivePartial } from 'util/commonTypes';
import { SearchContextProps } from './search-context';
import { asArray } from './search-util';

interface Props {
  children?: ReactNode;
}

type SearchVariables = Omit<SearchContextProps, 'getSearchQuery'>;

const SearchContext = createContext<RecursivePartial<SearchContextProps>>({});

export const __SearchContext = SearchContext;

export default function SearchProvider({ children }: Props) {
  const router = useRouter();

  const [searchVars, setSearchVars] = useState<
    RecursivePartial<SearchVariables>
  >({});

  useEffect(() => {
    if (!router.isReady) return;

    const searchTerms = router.query;
    const tempSearchVars: RecursivePartial<SearchVariables> = {};

    if (searchTerms.key && !isArray(searchTerms.key)) {
      tempSearchVars.key = decodeURIComponent(searchTerms.key);
    } else {
      router.push('/');
    }

    if (searchTerms.name && !isArray(searchTerms.name)) {
      tempSearchVars.name = decodeURIComponent(searchTerms.name);
    }

    if (searchTerms.offersOnly) {
      tempSearchVars.showOffersOnly = true;
    }

    if (searchTerms.category) {
      tempSearchVars.selectedCategoryIds = asArray(searchTerms.category);
    }

    if (searchTerms.illness) {
      tempSearchVars.selectedIllnessIds = asArray(searchTerms.illness);
    }

    if (searchTerms.store) {
      tempSearchVars.selectedStoreIds = asArray(searchTerms.store);
    }

    // price
    if (searchTerms.minPrice && !Number.isNaN(searchTerms.minPrice)) {
      tempSearchVars.price = {
        ...tempSearchVars.price,
        min: +searchTerms.minPrice
      };
    }
    if (searchTerms.maxPrice && !Number.isNaN(searchTerms.maxPrice)) {
      tempSearchVars.price = {
        ...tempSearchVars.price,
        max: +searchTerms.maxPrice
      };
    }

    // calories check
    if (searchTerms.minCalories && !Number.isNaN(searchTerms.minCalories)) {
      tempSearchVars.calories = {
        ...tempSearchVars.calories,
        min: +searchTerms.minCalories
      };
    }
    if (searchTerms.maxCalories && !Number.isNaN(searchTerms.maxCalories)) {
      tempSearchVars.calories = {
        ...tempSearchVars.calories,
        max: +searchTerms.maxCalories
      };
    }

    // sodium check
    if (searchTerms.minSodium && !Number.isNaN(searchTerms.minSodium)) {
      tempSearchVars.sodium = {
        ...tempSearchVars.sodium,
        min: +searchTerms.minSodium
      };
    }
    if (searchTerms.maxSodium && !Number.isNaN(searchTerms.maxSodium)) {
      tempSearchVars.sodium = {
        ...tempSearchVars.sodium,
        max: +searchTerms.maxSodium
      };
    }

    setSearchVars(tempSearchVars);
  }, [router]);

  const getProductsQueryBase = useCallback(() => {
    const query: SearchProductsQueryVariables['input'] = {
      status: 'AVAILABLE'
    };

    if (searchVars.showOffersOnly) {
      query.salePrice_not = null;
    }

    if (
      searchVars.selectedCategoryIds?.length ||
      searchVars.selectedIllnessIds?.length
    ) {
      const selectedIds = [
        ...(searchVars.selectedCategoryIds ?? []),
        ...(searchVars.selectedIllnessIds ?? [])
      ];

      query.category_some = {
        id_in: selectedIds
      };
    }

    if (searchVars.selectedStoreIds?.length) {
      query.store = {
        id_in: searchVars.selectedStoreIds
      };
    }

    query.price_gt = searchVars.price?.min;
    query.price_lt = searchVars.price?.max;

    query.calories100gr_gt = searchVars.calories?.min;
    query.calories100gr_lt = searchVars.calories?.max;

    query.sodio_gt = searchVars.sodium?.min;
    query.sodio_lt = searchVars.sodium?.max;

    return {
      input: query,
      search: searchVars.name
    } as Pick<SearchProductsQueryVariables, 'input' | 'search'>;
  }, [searchVars]);

  return (
    <SearchContext.Provider value={{ ...searchVars, getProductsQueryBase }}>
      {children}
    </SearchContext.Provider>
  );
}
