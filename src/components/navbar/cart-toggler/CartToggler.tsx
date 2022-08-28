import { Logo } from 'components/logo';
import breakpoints from 'constants/breakpoints';
import useMediaQuery from 'hooks/useMediaQuery';
import styles from './CartToggler.module.css';

export default function CartToggler() {
  const isBiggerThanSM = useMediaQuery(`(min-width:${breakpoints.sm}px)`);

  return (
    <div className={styles.cart}>
      <div className={styles.logoWrapper}>
        <Logo variant="icon" />
      </div>
      {isBiggerThanSM && <>4</>}
    </div>
  );
}
