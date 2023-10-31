import React from 'react';

type Props = {
  slug: string;
};

export function InnerEmbedCard(props: Props) {
  return <span>InnerEmbed: /{props.slug}</span>;
}
