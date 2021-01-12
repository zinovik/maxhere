import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

interface TagProps {
  pageContext: any;
  data: any;
  location: any;
}

const Tag: React.FC<TagProps> = ({ pageContext, data, location }) => {
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
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title } = node.frontmatter;
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
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

export default Tag;

export const pageQuery = graphql`
  query Tag($tag: String) {
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
