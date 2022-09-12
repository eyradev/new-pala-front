import ProductDetailsSection from 'components/sections/product-details-section/ProductDetailsSection';
import ProductReviewSection from 'components/sections/product-review-section/ProductReviewSection';
import SimilarProductsSection from 'components/sections/similar-products-section/SimilarProductsSection';
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
      <ProductDetailsSection productId={productId} />
      <ProductReviewSection productId={productId} />
      <SimilarProductsSection productId={productId} />
    </>
  );
}

ProductPage.Layout = PropductLayout;
