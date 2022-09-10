import { ProductDetails } from 'components/product-details';
import { Spinner } from 'components/spinner';
import { Product, useProductQuery } from 'generated/graphql';

interface Props {
  productId: string;
}

export default function ProductDetailsSection({ productId }: Props) {
  const { data, error, loading } = useProductQuery({
    variables: {
      productId
    }
  });

  if (loading) return <Spinner />;
  if (error || !data?.allProducts?.length) return null;

  const [product] = data.allProducts;
  if (!product) return null;

  return (
    <div className="section">
      <ProductDetails product={product as Product} />
    </div>
  );
}
