import { IllnessDropdown } from 'components/navbar/illness-dropdown';
import StandardLayout from 'layouts/standard/StandardLayout';

const Home = () => (
  <>
    <IllnessDropdown />
  </>
);

Home.Layout = StandardLayout;
export default Home;
