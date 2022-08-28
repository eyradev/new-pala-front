import { ReactNode } from 'react';
import { Spinner, SpinnerProps } from 'reactstrap';

interface Props extends SpinnerProps {
  children?: ReactNode;
}

export default function CustomSpinner({ children, ...spinnerProps }: Props) {
  return (
    <div>
      <Spinner {...spinnerProps}>{children || null}</Spinner>
    </div>
  );
}
