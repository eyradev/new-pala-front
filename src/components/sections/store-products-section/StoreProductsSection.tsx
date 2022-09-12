import { ProductList } from 'components/product-list';
import { Section } from 'components/section';
import { Spinner } from 'components/spinner';
import {
  Product,
  useProductQuery,
  useTopStoreProductsLazyQuery
} from 'generated/graphql';
import { useEffect } from 'react';

interface Props {
  productId: string;
}

export default function StoreProductsSection({ productId }: Props) {
  const { data, error, loading } = useProductQuery({
    variables: { productId }
  });

  const [getTopStoreProducts, { data: storeProductsData }] =
    useTopStoreProductsLazyQuery();

  useEffect(() => {
    if (!data?.allProducts?.length) return;
    const product = data.allProducts[0];
    if (!product?.store?.name) return;

    getTopStoreProducts({
      variables: {
        selectedProductId: productId,
        storeId: product.store.id
      }
    });
  }, [data, getTopStoreProducts, productId]);

  if (loading) return <Spinner />;
  if (
    error ||
    !data?.allProducts?.length ||
    !storeProductsData?.allProducts?.length
  )
    return null;

  const storeName = data.allProducts[0]?.store?.name;
  if (!storeName) return null;

  const storeProducts = storeProductsData.allProducts.reduce<
    Partial<Product>[]
  >((prods, prod) => {
    if (prod) {
      prods.push(prod as any);
    }
    return prods;
  }, []);

  return (
    <div style={{ backgroundColor: '#F2B73F' }}>
      <Section title={`Más Productos de ${storeName}`}>
        <ProductList products={storeProducts} />
      </Section>
    </div>
  );
}
