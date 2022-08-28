import breakpoints from 'constants/breakpoints';
import useMediaQuery from 'hooks/useMediaQuery';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap';

export default function ProfileDropdown() {
  const user = useUser();
  const isLg = useMediaQuery(`(min-width:${breakpoints.lg}px)`);

  if (!user?.name)
    return (
      <div style={isLg ? { display: 'flex', alignItems: 'center' } : undefined}>
        <NavItem>
          <Link href="/workwithus">
            <a className="nav-link">Vende</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/login" style={{ whiteSpace: 'nowrap' }}>
            <a className="nav-link">Inicia Sesión</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/signup">
            <a className="nav-link">Registrate</a>
          </Link>
        </NavItem>
      </div>
    );
  return (
    <UncontrolledDropdown>
      <DropdownToggle
        caret
        color="default"
        data-toggle="dropdown"
        id="user-dropdown"
        nav
      >
        Hola {user?.name}
      </DropdownToggle>
      <DropdownMenu aria-labelledby="navbarDropdownMenuUser" left>
        <DropdownItem>
          <Link href="/personal-info">
            <a>
              <i className="now-ui-icons users_single-02" />
              Perfil
            </a>
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/history">
            <a>
              <i className="now-ui-icons files_pape" />
              Historial
            </a>
          </Link>
        </DropdownItem>
        <DropdownItem>
          <i className="now-ui-icons ui-1_settings-gear-63" />
          Cerrar Sesión
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
