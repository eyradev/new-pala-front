import { PromoBanner } from 'components/promo-banner';
import { useContentBySectionQuery } from 'generated/graphql';
import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { getRandomInt } from 'util/math';

interface Props {
  section: string;
}

export default function ContentBanner({ section }: Props) {
  const { data, loading, error } = useContentBySectionQuery({
    variables: { section }
  });

  const [contentIdx, setContentIdx] = useState(0);

  useEffect(() => {
    if (!data?.allCustomContents?.length) return;
    setContentIdx(getRandomInt(0, data.allCustomContents.length));
  }, [data]);

  if (error || !data?.allCustomContents?.length) return null;
  if (loading) return <Spinner />;

  const selectedContent = data.allCustomContents[contentIdx];

  if (!selectedContent) return null;
  return <PromoBanner content={selectedContent} />;
}
