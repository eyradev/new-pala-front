import { ProductHeader } from 'components/product-header';
import { useProductQuery } from 'generated/graphql';
import { Spinner } from 'reactstrap';

interface Props {
  productId: string;
}

export default function ProductStoreHeader({ productId }: Props) {
  const { data, error, loading } = useProductQuery({
    variables: { productId }
  });

  if (loading) return <Spinner />;
  if (error || !data?.allProducts?.length) return null;

  const store = data.allProducts[0]?.store;
  if (!store) return null;

  return <ProductHeader store={store} />;
}
