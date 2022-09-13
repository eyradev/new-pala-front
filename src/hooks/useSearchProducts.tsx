import { Product, useSearchProductsLazyQuery } from 'generated/graphql';
import { SearchContextProps } from 'providers/search-provider/search-context';
import { useEffect } from 'react';
import useSearch from './useSearch';

const perPage = 3;

interface Props {
  pageIdx: number;
}

export default function useSearchProducts({ pageIdx }: Props) {
  const { getProductsQueryBase } = useSearch();

  const [searchProducts, { data, error, loading }] = useSearchProductsLazyQuery(
    {
      refetchWritePolicy: 'overwrite'
    }
  );

  useEffect(() => {
    if (!getProductsQueryBase) return;
    const base = (
      getProductsQueryBase as SearchContextProps['getProductsQueryBase']
    )();

    searchProducts({
      variables: {
        ...base,
        skip: pageIdx * perPage,
        first: perPage + 1
      }
    });
  }, [getProductsQueryBase, pageIdx, searchProducts]);

  const products = data?.allProducts?.reduce<Partial<Product>[]>(
    (prods, prod) => {
      if (prod) {
        prods.push(prod as Partial<Product>);
      }
      return prods;
    },
    []
  );

  return {
    products: products ?? [],
    error,
    loading
  };
}
