/* eslint-disable no-underscore-dangle */
import { Spinner } from 'components/spinner';
import {
  SearchProductsQueryVariables,
  useSearchLimitsQuery
} from 'generated/graphql';
import { isArray } from 'lodash';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Limited, RecursivePartial } from 'util/commonTypes';
import { SearchContextProps } from './search-context';
import { asArray } from './search-util';

interface Props {
  children?: ReactNode;
}

export type SearchVariables = Omit<
  SearchContextProps,
  'getProductsQueryBase' | 'priceLimits' | 'calorieLimits' | 'sodiumLimits'
>;

const SearchContext = createContext<RecursivePartial<SearchContextProps>>({});

export const __SearchContext = SearchContext;

export default function SearchProvider({ children }: Props) {
  const router = useRouter();

  const { data, loading, error } = useSearchLimitsQuery();

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

  if (loading) return <Spinner />;
  if (error || !data) return null;

  const priceLimits: Partial<Limited<number>> = {};
  if (data.maxPrice?.length)
    priceLimits.max = data.maxPrice[0]?.price ?? undefined;
  if (data.minPrice?.length)
    priceLimits.min = data.minPrice[0]?.price ?? undefined;

  const calorieLimits: Partial<Limited<number>> = {};
  if (data.maxCalories?.length)
    calorieLimits.max = data.maxCalories[0]?.calories100gr ?? undefined;
  if (data.minCalories?.length)
    calorieLimits.min = data.minCalories[0]?.calories100gr ?? undefined;

  const sodiumLimits: Partial<Limited<number>> = {};
  if (data.maxSodium?.length)
    sodiumLimits.max = data.maxSodium[0]?.sodio ?? undefined;
  if (data.minSodium?.length)
    sodiumLimits.min = data.minSodium[0]?.sodio ?? undefined;

  return (
    <SearchContext.Provider
      value={{
        ...searchVars,
        getProductsQueryBase,
        priceLimits,
        sodiumLimits,
        calorieLimits
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
