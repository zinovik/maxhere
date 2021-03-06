import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

const Tag = styled.span`
  padding: 5px;
`;

interface TagsListProps {
  tags: (string | { fieldValue: string; totalCount: number })[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <>
      {tags.map(tag => {
        const { fieldValue, totalCount = 0 } =
          typeof tag === 'string' ? { fieldValue: tag } : tag;

        return (
          <Tag key={fieldValue}>
            <Link to={`/tag/${kebabCase(fieldValue)}`} rel="next">
              {fieldValue}
              {totalCount ? ` (${totalCount})` : ''}
            </Link>
          </Tag>
        );
      })}
    </>
  );
};

export default TagsList;
