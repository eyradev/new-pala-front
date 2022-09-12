import { ContentBanner } from 'components/content-banner';
import ProductDetailsSection from 'components/sections/product-details-section/ProductDetailsSection';
import ProductReviewSection from 'components/sections/product-review-section/ProductReviewSection';
import SimilarProductsSection from 'components/sections/similar-products-section/SimilarProductsSection';
import StoreProductsSection from 'components/sections/store-products-section/StoreProductsSection';
import sections from 'constants/sections';
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
      <StoreProductsSection productId={productId} />
      <SimilarProductsSection productId={productId} />
      <ContentBanner section={sections.productDetailsPromo} />
    </>
  );
}

ProductPage.Layout = PropductLayout;
