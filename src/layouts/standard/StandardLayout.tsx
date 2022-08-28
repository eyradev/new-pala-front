import { Navbar } from 'components/navbar';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function StandardLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="wrapper">{children}</div>
    </>
  );
}
