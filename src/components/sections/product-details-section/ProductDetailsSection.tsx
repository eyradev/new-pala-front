import { ApolloError } from '@apollo/client';
import { ProductDetails } from 'components/product-details';
import { Spinner } from 'components/spinner';
import {
  Product,
  useAddLineItemMutation,
  useProductQuery
} from 'generated/graphql';
import { ProductStock } from 'models/product-stock.model';

interface Props {
  productId: string;
}

export default function ProductDetailsSection({ productId }: Props) {
  const { data, error, loading } = useProductQuery({
    variables: {
      productId
    }
  });

  const [addLineItem] = useAddLineItemMutation();

  const handleAddLineItem = async ({ stock }: ProductStock) => {
    try {
      await addLineItem({
        variables: { productId, quantity: stock }
      });
    } catch (e) {
      console.log((e as ApolloError).message);
    }
  };

  if (loading) return <Spinner />;
  if (error || !data?.allProducts?.length) return null;

  const [product] = data.allProducts;
  if (!product) return null;

  return (
    <div className="section">
      <ProductDetails
        product={product as Product}
        onLineItemAdd={handleAddLineItem}
      />
    </div>
  );
}
