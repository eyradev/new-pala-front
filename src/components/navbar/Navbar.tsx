import { Logo } from 'components/logo';
import { LogoProps } from 'components/logo/Logo';
import { SearchBox } from 'components/search';
import breakpoints from 'constants/breakpoints';
import useMediaQuery from 'hooks/useMediaQuery';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import {
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Row
} from 'reactstrap';
import { IllnessDropdown } from './illness-dropdown';
import styles from './Navbar.module.css';
import { PreferenceDropdown } from './preference-dropdown';
import { ProfileDropdown } from './profile-dropdown';

export default function ANavbar(): JSX.Element {
  const isLg = useMediaQuery(`(min-width:${breakpoints.lg}px)`);
  const isSm = useMediaQuery(
    `(min-width:${breakpoints.sm}px) and (max-width:${breakpoints.lg - 1}px)`
  );
  // const isXs = useMediaQuery(`(max-width:${breakpoints.sm - 1}px`);
  const user = useUser();

  let logoWidth = 50;
  let logoVariant: LogoProps['variant'] = 'icon';

  if (isLg) {
    logoWidth = 160;
    logoVariant = 'horizontal';
  } else if (isSm) {
    logoWidth = 80;
    logoVariant = 'typography';
  }

  return (
    <Navbar
      className="bg-white"
      expand="lg"
      style={{ marginBottom: 0, zIndex: 100 }}
    >
      <Container style={{ display: 'flex' }}>
        <div
          className="navbar-translate"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <NavbarBrand
            style={{
              minHeight: '20px',
              width: `${logoWidth}px`
            }}
          >
            <Logo variant={logoVariant} />
          </NavbarBrand>
          <Row style={{ width: '100%' }}>
            <Col lg="8">
              <SearchBox />
            </Col>
            {isLg && (
              <Col xs="12">
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
                    <Link
                      className="dropdown-toggle nav-link"
                      href="/contactus"
                    >
                      <a className="nav-link">Contactanos</a>
                    </Link>
                  </NavItem>
                </div>
              </Col>
            )}
          </Row>
          <button
            type="button"
            onClick={() => {
              document.documentElement.classList.toggle('nav-open');
            }}
            aria-expanded
            className="navbar-toggler"
          >
            <span className="navbar-toggler-bar top-bar" />
            <span className="navbar-toggler-bar middle-bar" />
            <span className="navbar-toggler-bar bottom-bar" />
          </button>
        </div>
        <Collapse isOpen={false} navbar>
          <Nav className="ml-auto" navbar>
            <Row>
              <Col>
                <NavItem>
                  <p
                    style={{
                      marginLeft: '10px',
                      whiteSpace: 'nowrap',
                      color: 'var(--secondary)'
                    }}
                  >
                    De la fábrica a tu casa, buena idea !!!
                  </p>
                </NavItem>
              </Col>
              <Col xs={user ? 8 : 12}>
                <ProfileDropdown />
              </Col>
              <Col xs="2">
                <NavItem>Cart</NavItem>
              </Col>
            </Row>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
