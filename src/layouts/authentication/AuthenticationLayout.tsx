import { AutenticationNavbar } from 'components/authentication-navbar';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function AuthenticationLayout({ children }: Props): JSX.Element {
  return (
    <>
      <AutenticationNavbar />
      <div className="wrapper">{children}</div>
    </>
  );
}
