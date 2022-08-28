import { Store } from 'generated/graphql';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardBody,
  CardFooter,
  CardProps,
  CardSubtitle,
  CardTitle
} from 'reactstrap';
import styles from './StoreCard.module.css';

interface Props extends CardProps {
  store: Partial<Store>;
}

export default function StoreCard({ store, ...cardProps }: Props) {
  const storeURI = `/search?key=${encodeURIComponent(
    `Tienda ${store.name}`
  )}&store=${store.id}`;

  if (
    !store?.banner?.publicUrlTransformed ||
    !store?.logo?.publicUrlTransformed
  ) {
    return null;
  }

  return (
    <Card className={styles.storeCard} {...cardProps}>
      <div className={styles.cardImage}>
        <Image
          className={styles.banner}
          layout="responsive"
          width="100%"
          height="30px"
          alt={`${store.name} banner`}
          src={store.banner?.publicUrlTransformed}
        />
      </div>
      <div className={styles.storeLogo}>
        <Link href={storeURI}>
          <a>
            <Image
              layout="fill"
              alt={`${store.name} logo`}
              src={store.logo?.publicUrlTransformed}
            />
          </a>
        </Link>
      </div>
      <CardBody>
        <Link href={storeURI}>
          <a>
            <CardTitle tag="h4" className={styles.cardText}>
              {store.name}
            </CardTitle>
          </a>
        </Link>
        {store.description && store.description.length > 0 && (
          <Link href={storeURI}>
            <a>
              <CardSubtitle tag="p" className={styles.cardText}>
                {store.description.length > 40
                  ? `${store.description.substring(0, 39)}...`
                  : store.description}
              </CardSubtitle>
            </a>
          </Link>
        )}
      </CardBody>
      <CardFooter className={styles.cardFooter}>
        <Link href={storeURI}>
          <a>Ver tienda</a>
        </Link>
      </CardFooter>
    </Card>
  );
}
