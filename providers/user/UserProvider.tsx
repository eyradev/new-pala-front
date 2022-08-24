import { ReactNode } from 'react';
import { useCreateUserAddressMutation } from '../../generated/graphql';

export default function UserProvider({ children }: { children?: ReactNode }) {
  const [pp] = useCreateUserAddressMutation({
    variables: {
      addresL1: '',
      cityId: '',
      description: ''
    }
  });

  console.log(pp);
  return <div>{children}</div>;
}
