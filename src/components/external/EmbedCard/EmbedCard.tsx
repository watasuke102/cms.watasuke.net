import React from 'react';

type Props = {
  url: string;
};

export function EmbedCard(props: Props) {
  return <span>Embed: {props.url}</span>;
}
