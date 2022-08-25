import { Logo } from 'components/logo';
import { LogoProps } from 'components/logo/Logo';
import breakpoints from 'constants/breakpoints';
import useMediaQuery from 'hooks/useMediaQuery';
import Link from 'next/link';
import { Container, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { IllnessDropdown } from './illness-dropdown';
import styles from './Navbar.module.css';
import { PreferenceDropdown } from './preference-dropdown';

export default function ANavbar(): JSX.Element {
  const isLg = useMediaQuery(`(min-width:${breakpoints.lg}px)`);
  const isSm = useMediaQuery(
    `(min-width:${breakpoints.sm}px) and (max-width:${breakpoints.lg - 1}px)`
  );
  // const isXs = useMediaQuery(`(max-width:${breakpoints.sm - 1}px`);

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
    <Navbar className="bg-white" expand="lg">
      <Container>
        <NavbarBrand
          style={{
            minHeight: '20px',
            width: `${logoWidth}px`
          }}
        >
          <Logo variant={logoVariant} />
        </NavbarBrand>
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
