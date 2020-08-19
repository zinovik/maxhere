import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import BackToTop from '../components/back-to-top';
import { BlogIndexQuery } from '../../gatsby-graphql';

const H3 = styled.h3`
  margin: 10px;
`;

const Article = styled.article`
  margin-bottom: 40px;
`;

const PostImg = styled(Img)`
  margin: 10px 0px;
`;

interface BlogIndexProps {
  data: BlogIndexQuery;
  location: {
    pathname: string;
  };
}

const BlogIndex: React.FC<BlogIndexProps> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? '';
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;

        return (
          <Article key={node.fields.slug}>
            <header>
              <H3>
                <Link to={node.fields.slug}>
                  {node.frontmatter.featuredImage && (
                    <PostImg
                      fluid={
                        node.frontmatter.featuredImage.childImageSharp.fluid
                      }
                      style={{ maxHeight: '500px' }}
                      imgStyle={{ objectFit: 'contain' }}
                    />
                  )}
                  {title}
                </Link>
              </H3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </Article>
        );
      })}
    <BackToTop />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
