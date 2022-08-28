import { ContentCarousel } from 'components/content-carousel';
import sections from 'constants/sections';
import StandardLayout from 'layouts/standard/StandardLayout';

const Home = () => (
  <>
    <ContentCarousel section={sections.homeHeader} />
  </>
);

Home.Layout = StandardLayout;
export default Home;
