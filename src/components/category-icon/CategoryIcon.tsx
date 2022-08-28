import { Category } from 'generated/graphql';
import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { UncontrolledTooltip } from 'reactstrap';

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  category: Partial<Category>;
  categoryColor?: boolean;
  itemIdentifier?: string;
}

export default function CategoryIcon({
  category,
  categoryColor,
  itemIdentifier,
  ...divProps
}: Props): JSX.Element {
  let categoryId = `id-${category.id}`;
  if (itemIdentifier) categoryId += itemIdentifier;

  return (
    <>
      <div
        id={categoryId}
        style={{
          backgroundColor: categoryColor
            ? category.color || 'lightgray'
            : undefined,
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
        {...divProps}
      >
        {category.icon?.publicUrlTransformed ? (
          <Image
            src={category.icon.publicUrlTransformed}
            alt={category.name || 'categoria'}
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <div style={{ fontSize: '1rem', fontWeight: 'bolder' }}>
            {category.name?.charAt(0)}
          </div>
        )}
      </div>
      <UncontrolledTooltip target={categoryId}>
        {category.type === 'ILLNESS'
          ? `Apto para ${category.name?.toLowerCase()}`
          : category.name?.toLowerCase()}
      </UncontrolledTooltip>
    </>
  );
}
