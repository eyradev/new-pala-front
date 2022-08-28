/* eslint-disable react/no-array-index-key */
import { StoreCard } from 'components/store-card';
import breakpoints from 'constants/breakpoints';
import { Store } from 'generated/graphql';
import useMediaQuery from 'hooks/useMediaQuery';
import { Col, Row } from 'reactstrap';
import styles from './StoreList.module.css';

interface Props {
  stores: Partial<Store>[];
}

export default function StoreList({ stores }: Props): JSX.Element {
  const isMD = useMediaQuery(`(max-width: ${breakpoints.lg}px)`);

  const storeCards = stores.reduce<JSX.Element[]>((acc, curr) => {
    if (curr) {
      acc.push(
        <StoreCard store={curr} style={{ width: isMD ? '350px' : undefined }} />
      );
    }
    return acc;
  }, []);

  if (isMD) {
    return (
      <div className={styles.scrollingWrapper}>
        {storeCards.map((storeCard, i) => (
          <div key={`store-${i}`} className={styles.card}>
            {storeCard}
          </div>
        ))}
      </div>
    );
  }
  return (
    <Row>
      {storeCards.map((storeCard, i) => (
        <Col lg="4" key={`store-${i}`}>
          {storeCard}
        </Col>
      ))}
    </Row>
  );
}
