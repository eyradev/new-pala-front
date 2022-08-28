import { ContentBanner } from 'components/content-banner';
import { ContentCarousel } from 'components/content-carousel';
import {
  CategorySection,
  OfferSection,
  StoreSection
} from 'components/sections';
import sections from 'constants/sections';
import StandardLayout from 'layouts/standard/StandardLayout';

const Home = () => (
  <>
    <ContentCarousel section={sections.homeHeader} />
    <div className="main">
      <OfferSection count={4} />
      <ContentBanner section={sections.homePromo} />
      <StoreSection count={5} />
      <CategorySection count={8} />
    </div>
  </>
);

Home.Layout = StandardLayout;
export default Home;
