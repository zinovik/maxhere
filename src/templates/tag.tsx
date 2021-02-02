import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

import { TagTemplateQuery } from '../../gatsby-graphql';

interface Context {
  tag: string;
}

interface TagTemplateProps {
  data: TagTemplateQuery;
  pageContext: Context;
  location: {
    pathname: string;
  };
}

const TagTemplate: React.FC<TagTemplateProps> = ({
  pageContext,
  data,
  location,
}) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? '';

  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <Layout location={location} title={siteTitle}>
      <div>
        <h1>{tagHeader}</h1>

        <ul>
          {edges.map(edge => {
            const slug = edge.node.fields?.slug ?? '';

            return (
              <li key={slug}>
                <Link to={slug}>{edge.node.frontmatter?.title}</Link>
              </li>
            );
          })}
        </ul>

        <Link to="/tags">All tags</Link>
        <br />
        <br />
      </div>
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query TagTemplate($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
