import { ReactNode } from 'react';
import { useCreate_User_AddressMutation } from '../../generated/graphql';

export default function UserProvider({ children }: { children?: ReactNode }) {
  const [pp] = useCreate_User_AddressMutation({
    variables: {
      addresL1: '',
      cityId: '',
      description: ''
    }
  });

  console.log(pp);
  return <div>{children}</div>;
}
