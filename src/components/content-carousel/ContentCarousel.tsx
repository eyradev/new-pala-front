import { Carousel } from 'components/carousel';
import { ContentCarouselProps } from 'components/carousel/ContentCarousel';
import { Spinner } from 'components/spinner';
import { useContentBySectionQuery } from 'generated/graphql';

interface Props {
  section: string;
}

export default function ContentCarousel({ section }: Props) {
  const { data, loading, error } = useContentBySectionQuery({
    variables: {
      section
    }
  });

  if (error || !data?.allCustomContents?.length) return null;
  if (loading) return <Spinner />;

  const items = data.allCustomContents.reduce<ContentCarouselProps['items']>(
    (validContents, content) => {
      if (!content?.heading1 || !content?.image1?.publicUrlTransformed)
        return validContents;
      validContents.push({
        background: content?.image1?.publicUrlTransformed || '',
        header: content?.heading1 || '',
        redirectPath: content?.path || undefined,
        id: content.id,
        body: content.body as string | undefined
      });
      return validContents;
    },
    []
  );

  return <Carousel items={items} />;
}
