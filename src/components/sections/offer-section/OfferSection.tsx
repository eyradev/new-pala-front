import { ProductList } from 'components/product-list';
import { Section } from 'components/section';
import { Spinner } from 'components/spinner';
import { Product, useProductOffersQuery } from 'generated/graphql';
import { Col, Row } from 'reactstrap';

interface Props {
  count: number;
}

export default function OfferSection({ count }: Props) {
  const { data, loading, error } = useProductOffersQuery({
    variables: {
      count
    }
  });

  if (loading) return <Spinner />;
  if (error || !data?.allProducts?.length) return null;

  const validProducts = data.allProducts.reduce<Partial<Product>[]>(
    (prods, prod) => {
      if (prod) {
        prods.push(prod as any);
      }
      return prods;
    },
    []
  );

  return (
    <Section
      title="Promociones"
      small={{
        text: 'ver todas',
        path: `/search?key=${encodeURIComponent(
          'Todas Nuestras Ofertas!'
        )}&offersOnly=true`
      }}
    >
      <Row>
        <Col>
          <ProductList products={validProducts} />
        </Col>
      </Row>
    </Section>
  );
}
