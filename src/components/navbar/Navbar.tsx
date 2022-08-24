import { Container, Navbar } from 'reactstrap';
import { IllnessDropdown } from './illness-dropdown';

export default function ANavbar(): JSX.Element {
  return (
    <Navbar className="bg-white" expand="lg">
      <Container>
        <div
          className="navbar-translate"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <IllnessDropdown />
        </div>
      </Container>
    </Navbar>
  );
}
