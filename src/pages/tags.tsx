import React from 'react';

import kebabCase from 'lodash/kebabCase';

import { Helmet } from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { TagsPageQuery } from '../../gatsby-graphql';

interface TagsPageProps {
  data: TagsPageQuery;
  location: {
    pathname: string;
  };
}

const TagsPage: React.FC<TagsPageProps> = ({
  data,
  data: {
    allMdx: { group },
  },
  location,
}) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? '';

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet title={siteTitle} />
      <div>
        <h1>Tags</h1>
        <ul>
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default TagsPage;

export const pageQuery = graphql`
  query TagsPage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
