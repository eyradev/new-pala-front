import { CategoryList } from 'components/category-list';
import { Section } from 'components/section';
import { Spinner } from 'components/spinner';
import { Category, useAllIconPreferencesQuery } from 'generated/graphql';
import { Col, Row } from 'reactstrap';

interface Props {
  count: number;
}

export default function OfferSection({ count }: Props) {
  const { data, error, loading } = useAllIconPreferencesQuery({
    variables: { count }
  });

  if (loading) return <Spinner />;
  if (error || !data?.allIconPreferences?.length) return null;

  const validCategories = data.allIconPreferences.reduce<Partial<Category>[]>(
    (cats, cat) => {
      if (cat) {
        cats.push(cat as any);
      }
      return cats;
    },
    []
  );

  return (
    <Section title="Categorias">
      <Row>
        <Col>
          <CategoryList categories={validCategories} />
        </Col>
      </Row>
    </Section>
  );
}
