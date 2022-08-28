import { HTMLProps } from 'react';
import styles from './Star.module.css';

export default function Star({
  children,
  ...props
}: HTMLProps<HTMLDivElement>): JSX.Element {
  return (
    <div {...props}>
      <div className={styles.star12}>
        <div className={styles.textWrapper}>{children}</div>
      </div>
    </div>
  );
}
