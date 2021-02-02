import React from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';

interface DisqusProps {
  slug: string;
  title: string;
  shortname: string;
}

const getConfig = ({
  slug,
  title,
  shortname,
}: {
  slug: string;
  title: string;
  shortname: string;
}) => {
  const identifier = slug.replace(/\/$/, '');

  return {
    shortname,
    config: {
      identifier,
      title,
      disqus_identifier: identifier,
    },
  };
};

const Comments: React.FC<DisqusProps> = ({ slug, title, shortname }) => {
  const config = getConfig({ slug, title, shortname });

  return <DiscussionEmbed {...config} />;
};

const CommentsCount: React.FC<DisqusProps> = ({ slug, title, shortname }) => {
  const config = getConfig({ slug, title, shortname });

  return <CommentCount {...config}>... Comments</CommentCount>;
};

export { Comments, CommentsCount };
