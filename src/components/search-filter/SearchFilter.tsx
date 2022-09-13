import { Spinner } from 'components/spinner';
import useSearchProducts from 'hooks/useSearchProducts';

export default function SearchFilter() {
  const { products, loading, error } = useSearchProducts({ pageIdx: 0 });

  if (loading) return <Spinner />;
  if (error || !products.length) return null;

  return (
    <div>
      {products.map((prod) => (
        <p>{prod.name}</p>
      ))}
    </div>
  );
}
