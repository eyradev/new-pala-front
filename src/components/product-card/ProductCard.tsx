import { CategoryIcon } from 'components/category-icon';
import { Product } from 'generated/graphql';
import useUser from 'hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardBody,
  CardProps,
  CardSubtitle,
  CardTitle,
  Col,
  Row
} from 'reactstrap';
import { formatCurrency } from 'util/currency';
import styles from './ProductCard.module.css';
import { Star } from './star';

const maxCategoryLength = 3;

interface Props extends CardProps {
  product: Partial<Product>;
}

export default function ProductCard({ product, ...cardProps }: Props) {
  const user = useUser();

  const photo = product.photo?.length ? product.photo[0] : undefined;

  const discount =
    product.salePrice && product.price
      ? Math.round(((product.price - product.salePrice) * 100) / product.price)
      : undefined;

  let price = product?.price;
  if (discount) {
    price = product?.salePrice;
  }

  if (!photo?.image?.publicUrlTransformed) return null;

  return (
    <Card className={`${styles.productCard}`} {...cardProps}>
      <div className={`${styles['card-image']} card-image`}>
        <Link href={`/products/${product.id}`}>
          <a>
            <Image
              alt={photo.altText || '...'}
              src={photo.image?.publicUrlTransformed}
              className={styles.cardImage}
              layout="responsive"
              width="100%"
              height="80px"
            />
          </a>
        </Link>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0
        }}
      >
        {discount && (
          <Star style={{ height: '50px', width: '50px' }}>{discount}% Off</Star>
        )}
      </div>
      <CardBody style={{ whiteSpace: 'pre' }}>
        <Link href={`/products/${product.id}`}>
          <a>
            <CardTitle tag="h4" className={styles.title}>
              {product.name}
            </CardTitle>
          </a>
        </Link>
        {product.store && product.store.name && (
          <Link
            href={`/search?key=${encodeURIComponent(
              `Tienda ${product.store?.name}`
            )}&store=${product.store?.id}`}
          >
            <a>
              <CardSubtitle tag="p" className={styles.cardSubtitle}>
                {product.store?.name}
              </CardSubtitle>
            </a>
          </Link>
        )}
        {product.description && (
          <p className={`card-description ${styles.description}`}>
            {product.description?.length > 40
              ? `${product.description.substring(0, 39)}...`
              : product.description}
          </p>
        )}

        <div className={styles.footer}>
          {price && (
            <div className={styles.priceContainer}>
              <span className="price">{formatCurrency(price)}</span>
            </div>
          )}
          <Row>
            {product?.category?.slice(0, maxCategoryLength).map((category) => (
              <Col
                key={category.id}
                id={`prod-cat-${category.id}`}
                className={styles.category}
                style={{
                  backgroundColor: user?.category.find(
                    (c) => c.id === category.id
                  )
                    ? 'var(--success)'
                    : undefined
                }}
              >
                <CategoryIcon category={category} itemIdentifier={product.id} />
              </Col>
            ))}
          </Row>
        </div>
      </CardBody>
    </Card>
  );
}
