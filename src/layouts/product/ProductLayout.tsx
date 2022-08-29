import { Footer } from 'components/footer';
import { Navbar } from 'components/navbar';
import { LayoutProps } from 'layouts/common';

export default function StandardLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="wrapper">{children}</div>
      <Footer />
    </>
  );
}
