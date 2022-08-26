import { Logo } from 'components/logo';
import styles from './CartToggler.module.css';

export default function CartToggler() {
  return (
    <div className={styles.cart}>
      <div className={styles.logoWrapper}>
        <Logo variant="icon" />
      </div>
      4
    </div>
  );
}
