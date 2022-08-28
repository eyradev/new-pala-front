/* eslint-disable react/no-array-index-key */
import { CategoryCard } from 'components/category-card';
import breakpoints from 'constants/breakpoints';
import { Category } from 'generated/graphql';
import useMediaQuery from 'hooks/useMediaQuery';
import { Col, Row } from 'reactstrap';
import styles from './CategoryList.module.css';

interface Props {
  categories: Partial<Category>[];
}

export default function CategoryList({ categories }: Props): JSX.Element {
  const isMD = useMediaQuery(`(max-width: ${breakpoints.lg}px)`);

  const categoryCards = categories.reduce<JSX.Element[]>((acc, curr) => {
    if (curr) {
      acc.push(
        <CategoryCard
          category={curr}
          style={{
            backgroundColor: curr.color || 'lightgray',
            height: '250px',
            width: '250px'
          }}
        />
      );
    }
    return acc;
  }, []);

  if (isMD) {
    return (
      <div className={styles.scrollingWrapper}>
        {categoryCards.map((categoryCard, i) => (
          <div key={`prod-${i}`} className={styles.card}>
            {categoryCard}
          </div>
        ))}
      </div>
    );
  }
  return (
    <Row>
      {categoryCards.map((categoryCard, i) => (
        <Col lg="4" md="6" xl="3" key={`prod-${i}`}>
          {categoryCard}
        </Col>
      ))}
    </Row>
  );
}
