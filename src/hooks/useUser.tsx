import { useCurrentUserQuery } from 'generated/graphql';

export default function useUser() {
  const { data, error, loading } = useCurrentUserQuery();
  if (error) return undefined;
  if (loading) return undefined;
  return data?.authenticatedItem;
}
