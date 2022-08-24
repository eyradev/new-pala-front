import Link from 'next/link';
import { Container, Navbar, NavItem } from 'reactstrap';
import { IllnessDropdown } from './illness-dropdown';
import styles from './Navbar.module.css';
import { PreferenceDropdown } from './preference-dropdown';

export default function ANavbar(): JSX.Element {
  return (
    <Navbar className="bg-white" expand="lg">
      <Container>
        <div
          className="navbar-translate"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div className={styles.infoList}>
            <IllnessDropdown />
            <PreferenceDropdown />
            <NavItem>
              <Link
                href={`/search?key=${encodeURIComponent(
                  'Todas Nuestras Ofertas!'
                )}&offersOnly=true`}
              >
                <a className="nav-link">Promociones</a>
              </Link>
            </NavItem>
            <NavItem className={styles.Navlink}>
              <Link className="dropdown-toggle nav-link" href="/contactus">
                <a className="nav-link">Contactanos</a>
              </Link>
            </NavItem>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
