import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

import { CategoryTemplateQuery } from '../../gatsby-graphql';

interface Context {
  category: string;
}

interface CategoryTemplateProps {
  data: CategoryTemplateQuery;
  pageContext: Context;
  location: {
    pathname: string;
  };
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  pageContext,
  data,
  location,
}) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? '';

  const { category } = pageContext;
  const { edges, totalCount } = data.allMdx;

  const allCategories = data.categories.group;

  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? ' is' : 's are'
  } in "${category}" category`;

  return (
    <Layout location={location} title={siteTitle} categories={allCategories}>
      <div>
        <h1>{categoryHeader}</h1>

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
      </div>
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryTemplate($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
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
    categories: allMdx {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
