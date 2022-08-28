import Section from 'components/section/Section';
import { Spinner } from 'components/spinner';
import { StoreList } from 'components/store-list';
import { Store, useAllStoresQuery } from 'generated/graphql';
import { Col, Row } from 'reactstrap';

interface Props {
  count: number;
}

export default function StoreSection({ count }: Props) {
  const { data, loading, error } = useAllStoresQuery({
    variables: {
      count
    }
  });

  if (loading) return <Spinner />;
  if (error || !data?.allStores?.length) return null;

  const validStores = data.allStores.reduce<Partial<Store>[]>(
    (stores, store) => {
      if (store) {
        stores.push(store as any);
      }
      return stores;
    },
    []
  );

  return (
    <Section
      title="Tiendas"
      small={{
        text: 'ver todas',
        path: `/search?key=${encodeURIComponent('Todos las Tiendas')}`
      }}
    >
      <Row>
        <Col>
          <StoreList stores={validStores} />
        </Col>
      </Row>
    </Section>
  );
}
