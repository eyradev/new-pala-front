/* eslint-disable no-unused-vars */
import { Formik } from 'formik';
import { Review } from 'generated/graphql';
import useUser from 'hooks/useUser';
import { ProductReview } from 'models/product-review.model';
import { Col, Container, Media, Row } from 'reactstrap';
import { productReviewSchema } from 'validation-schemas/product-review.validation';
import ProductReviewForm from './ProductReviewForm';

interface Props {
  reviews: Partial<Review>[];
  onReviewSubmit: (productReview: ProductReview) => Promise<void>;
}

export default function ProductReviews({
  reviews,
  onReviewSubmit
}: Props): JSX.Element {
  const user = useUser();

  const handleReviewSubmit = async (values: ProductReview) => {
    if (!values.score) return;
    await onReviewSubmit(values);
  };

  const [userReview] = reviews.filter(
    (rev) => user && rev.user?.id === user.id
  );
  const visibleReviews = reviews.filter((rev) => !!rev.visible).slice(0, 5);

  return (
    <div className="section section-comments">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            {visibleReviews.length > 0 && (
              <div className="media-area">
                <h3 className="title text-center">
                  {visibleReviews.length} Reseñas
                </h3>
                {visibleReviews.map((review) => (
                  <Media key={review.id}>
                    <Media body>
                      <Media heading tag="h5">
                        {review.user?.name || 'usuario'}
                        <small>· {review.points}⭐</small>
                      </Media>
                      <p>{review.comments}</p>
                    </Media>
                  </Media>
                ))}
              </div>
            )}
            {userReview ? (
              <h3 className="title text-center">
                {userReview.visible
                  ? 'Ya calificaste este producto'
                  : 'Se ha enviado tu calificación'}
              </h3>
            ) : (
              <>
                <h3 className="title text-center">Danos Tu Opinion</h3>
                <Formik<ProductReview>
                  initialValues={{ comment: '', score: undefined }}
                  validationSchema={productReviewSchema}
                  onSubmit={handleReviewSubmit}
                >
                  <ProductReviewForm />
                </Formik>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
