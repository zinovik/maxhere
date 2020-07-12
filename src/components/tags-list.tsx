import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

type TagsListProps = {
  tags: string[];
};

const Tag = styled.span`
  padding: 5px;
`;

const TagsList = ({ tags }: TagsListProps) => {
  return (
    <p>
      Tags:
      {tags.map(tag => (
        <Tag>
          <Link to={`/tag/${kebabCase(tag)}`} rel="next">
            {tag}
          </Link>
        </Tag>
      ))}
    </p>
  );
};

export default TagsList;
