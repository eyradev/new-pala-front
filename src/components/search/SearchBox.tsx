import { Spinner } from 'components/spinner';
import { resetIdCounter, useCombobox, UseComboboxStateChange } from 'downshift';
import { useSearchTitleLazyQuery } from 'generated/graphql';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import styles from './SearchBox.module.css';

interface SearchItem {
  id: string;
  name: string;
}

export default function SearchBox() {
  resetIdCounter();

  const [faFocus, setFaFocus] = useState(false);
  const [igWidth, setIgWidth] = useState(100);

  const handleInputFocus = () => setFaFocus(true);
  const handleInputBlur = () => setFaFocus(false);

  const router = useRouter();

  const [searchTitle, { data, loading }] = useSearchTitleLazyQuery({
    fetchPolicy: 'network-only'
  });

  const fallbackSearch = debounce(searchTitle, 350);

  const products = (data?.products as SearchItem[]) || [];
  const categories = (data?.categories as SearchItem[]) || [];
  const illnesses = (data?.illnesses as SearchItem[]) || [];
  const stores = (data?.stores as SearchItem[]) || [];

  const handleValueChange = ({
    inputValue
  }: UseComboboxStateChange<SearchItem>) => {
    if (!inputValue) return;
    fallbackSearch({ variables: { searchTerm: inputValue } });
  };

  const {
    inputValue,
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps
  } = useCombobox<SearchItem>({
    items: [...products, ...categories, ...stores, ...illnesses],
    onInputValueChange: handleValueChange
  });

  useEffect(() => {
    const handleSizeChange = () => {
      const width = document.getElementById('search-box')?.clientWidth || 100;
      setIgWidth(width);
    };

    handleSizeChange();

    window.addEventListener('resize', handleSizeChange);
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === '') return;
    router.push(
      `/search?name=${encodeURIComponent(inputValue)}&key=${encodeURIComponent(
        `Resultados para: ${inputValue}`
      )}`
    );
  };

  return (
    <div className={styles.container}>
      <form style={{ width: '100%' }} onSubmit={handleFormSubmit}>
        <div {...getComboboxProps()}>
          <InputGroup
            className={faFocus ? 'input-group-focus' : ''}
            id="search-box"
          >
            <div className="input-group-prepend">
              <InputGroupText>
                {loading ? (
                  <Spinner type="grow" color="primary" size="sm" />
                ) : (
                  <i className="fas fa-search" />
                )}
              </InputGroupText>
            </div>
            <Input
              {...getInputProps({
                type: 'search',
                placeholder: 'Buscar',
                onFocus: handleInputFocus,
                onBlur: handleInputBlur
              })}
            />
          </InputGroup>
        </div>
      </form>
      <div
        {...getMenuProps({
          className: styles.searchResults,
          style: {
            display:
              isOpen &&
              (categories.length ||
                products.length ||
                stores.length ||
                illnesses.length)
                ? 'inherit'
                : 'none',
            width: `calc(${igWidth}px - 20px)`
          }
        })}
      >
        <ul>
          {products.length > 0 && <li className={styles.header}>Productos</li>}
          {products.map((product) => (
            <li
              {...getItemProps({ item: product, key: product.id })}
              key={product.id}
            >
              <Link
                href={{
                  pathname: '/search',
                  query: {
                    name: encodeURIComponent(product.name),
                    key: encodeURIComponent(`Resultados para: ${product.name}`)
                  }
                }}
              >
                {product?.name}
              </Link>
            </li>
          ))}
          {categories.length > 0 && (
            <li className={styles.header}>Categorias</li>
          )}
          {categories.map((category) => (
            <li
              {...getItemProps({ item: category, key: category.id })}
              key={category.id}
            >
              <Link
                href={{
                  pathname: '/search',
                  query: {
                    category: category.id,
                    key: encodeURIComponent(`Categoría: ${category.name}`)
                  }
                }}
              >
                {category?.name}
              </Link>
            </li>
          ))}
          {illnesses.length > 0 && <li className={styles.header}>Apto Para</li>}
          {illnesses.map((illness) => (
            <li
              {...getItemProps({ item: illness, key: illness.id })}
              key={illness.id}
            >
              <Link
                href={{
                  pathname: '/search',
                  query: {
                    illness: illness.id,
                    key: encodeURIComponent(`Apto Para: ${illness.name}`)
                  }
                }}
              >
                {illness?.name}
              </Link>
            </li>
          ))}
          {stores.length > 0 && <li className={styles.header}>Tiendas</li>}
          {stores.map((store) => (
            <li
              {...getItemProps({ item: store, key: store.id })}
              key={store.id}
            >
              <Link
                href={{
                  pathname: '/search',
                  query: {
                    store: store.id,
                    key: encodeURIComponent(`Tienda: ${store.name}`)
                  }
                }}
              >
                {store?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
