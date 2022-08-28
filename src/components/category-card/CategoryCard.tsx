import { CategoryIcon } from 'components/category-icon';
import { Category } from 'generated/graphql';
import { useRouter } from 'next/router';
import { Card, CardBody, CardProps } from 'reactstrap';
import styles from './CategoryCard.module.css';

interface Props extends Omit<CardProps, 'onClick'> {
  category: Partial<Category>;
}

export default function CategoryCard({
  category,
  ...cardProps
}: Props): JSX.Element {
  const router = useRouter();

  const handeCardClick = () => {
    router.push({
      pathname: '/search',
      query: {
        key: encodeURIComponent(`Categoría ${category.name}`),
        category: category.id
      }
    });
  };

  return (
    <Card {...cardProps} onClick={handeCardClick}>
      <CardBody className={styles.cardBody}>
        <CategoryIcon category={category} />
      </CardBody>
    </Card>
  );
}
