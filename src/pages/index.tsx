import { ContentCarousel } from 'components/content-carousel';
import { OfferSection } from 'components/sections';
import sections from 'constants/sections';
import StandardLayout from 'layouts/standard/StandardLayout';

const Home = () => (
  <>
    <ContentCarousel section={sections.homeHeader} />
    <div className="main">
      <OfferSection count={4} />
    </div>
  </>
);

Home.Layout = StandardLayout;
export default Home;
