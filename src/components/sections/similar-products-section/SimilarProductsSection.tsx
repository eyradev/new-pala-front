import { ProductList } from 'components/product-list';
import { Section } from 'components/section';
import { Spinner } from 'components/spinner';
import {
  Product,
  useProductQuery,
  useTopSimilarProductsLazyQuery
} from 'generated/graphql';
import { useEffect } from 'react';

interface Props {
  productId: string;
}

export default function SimilarProductsSection({ productId }: Props) {
  const {
    data: productData,
    error: productError,
    loading: productLoading
  } = useProductQuery({
    variables: { productId }
  });

  const [getTopSimilarProducts, { data: similarProductsData }] =
    useTopSimilarProductsLazyQuery();

  useEffect(() => {
    if (!productData?.allProducts?.length) return;
    const product = productData.allProducts[0];
    if (!product) return;

    const categories = product?.category.map((category) => category.id) || [];

    getTopSimilarProducts({
      variables: {
        categories,
        productId
      }
    });
  }, [productData, getTopSimilarProducts, productId]);

  if (productLoading) return <Spinner />;
  if (
    productError ||
    !productData?.allProducts?.length ||
    !similarProductsData?.allProducts?.length
  )
    return null;

  const similarProducts = similarProductsData.allProducts.reduce<
    Partial<Product>[]
  >((prods, prod) => {
    if (prod) {
      prods.push(prod as any);
    }
    return prods;
  }, []);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Section title="Tambien te puede interesar">
        <ProductList products={similarProducts} />
      </Section>
    </div>
  );
}
