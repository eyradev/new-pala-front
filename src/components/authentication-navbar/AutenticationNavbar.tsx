/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Logo } from 'components/logo';
import Link from 'next/link';
import { useState } from 'react';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import styles from './AutenticationNavbar.module.css';

export default function DropDownFixedNavbar(): JSX.Element {
  const [isCollapseOpen, setCollapseOpen] = useState(false);

  const handleBodyClick = () => {
    document.documentElement.classList.toggle('nav-open');
    setCollapseOpen(false);
  };

  return (
    <>
      {isCollapseOpen && <div id="bodyClick" onClick={handleBodyClick} />}
      <Navbar
        className="navbar-absolute navbar-transparent"
        expand="lg"
        style={{ zIndex: 300 }}
      >
        <Container>
          <div className={`navbar-translate ${styles.Logo}`}>
            <Link href="/">
              <NavbarBrand to="/" id="navbar-brand" style={{ width: '100px' }}>
                <Logo variant="typography" />
              </NavbarBrand>
            </Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
