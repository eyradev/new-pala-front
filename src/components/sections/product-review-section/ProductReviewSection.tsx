import { ProductReviews } from 'components/product-review';
import { Spinner } from 'components/spinner';
import {
  ProductDocument,
  Review,
  useAddReviewMutation,
  useProductQuery
} from 'generated/graphql';
import { ProductReview } from 'models/product-review.model';

interface Props {
  productId: string;
}

export default function ProductReviewSection({ productId }: Props) {
  const [addReview] = useAddReviewMutation();
  const { data, error, loading } = useProductQuery({
    variables: { productId }
  });

  const handleReviewSubmit = async (productReview: ProductReview) => {
    if (!productReview.score) return;
    await addReview({
      variables: {
        productId,
        comment: productReview.comment,
        score: productReview.score
      },
      refetchQueries: [
        {
          query: ProductDocument,
          variables: { productId }
        }
      ]
    });
  };

  if (loading) return <Spinner />;
  if (error || !data?.allProducts?.length) return null;

  const reviews = data.allProducts[0]?.review as Review[];
  if (!reviews) return null;

  return (
    <ProductReviews reviews={reviews} onReviewSubmit={handleReviewSubmit} />
  );
}
