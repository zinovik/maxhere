import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styled from 'styled-components';

const LinkContainer = styled.span`
  padding: 5px;
`;

interface LinksListProps {
  links: (string | { fieldValue: string; totalCount: number })[];
  areTags?: boolean;
}

const LinksList: React.FC<LinksListProps> = ({ links, areTags }) => {
  const path = areTags ? 'tag' : 'category';

  return (
    <>
      {links.map(link => {
        const { fieldValue, totalCount = 0 } =
          typeof link === 'string' ? { fieldValue: link } : link;

        return (
          <LinkContainer key={fieldValue}>
            <Link to={`/${path}/${kebabCase(fieldValue)}`} rel="next">
              {fieldValue}
              {totalCount ? ` (${totalCount})` : ''}
            </Link>
          </LinkContainer>
        );
      })}
    </>
  );
};

export default LinksList;
