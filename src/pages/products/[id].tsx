import { ProductStoreHeader } from 'controllers/product-store-header';
import { PropductLayout } from 'layouts/product';
import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter();
  const { id: productId } = router.query;

  if (typeof productId !== 'string') return null;

  return (
    <>
      <ProductStoreHeader productId={productId} />
    </>
  );
}

ProductPage.Layout = PropductLayout;
