import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

interface TagsListProps {
  tags: string[];
}

const Tag = styled.span`
  padding: 5px;
`;

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <p>
      tags:
      {tags.map(tag => (
        <Tag key={tag}>
          <Link to={`/tag/${kebabCase(tag)}`} rel="next">
            {tag}
          </Link>
        </Tag>
      ))}
    </p>
  );
};

export default TagsList;
