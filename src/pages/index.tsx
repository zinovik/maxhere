import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BackToTop from '../components/back-to-top';
import Date from '../components/date';
import { CommentsCount } from '../components/disqus';
import MediaDescription from '../components/media-description';

const Title = styled.h3`
  margin: 10px 0;
`;

const Post = styled.article`
  margin-bottom: 40px;
`;

const PostImg = styled(Img)`
  margin: 0px;
`;

interface BlogIndexProps {
  data: unknown;
  location: {
    pathname: string;
  };
}

const BlogIndex: React.FC<BlogIndexProps> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? '';

  const posts = data.allMdx.edges;
  const allCategories = data.allMdx.group;

  const shortname = process.env.GATSBY_DISQUS_NAME || 'maxhere';

  return (
    <Layout location={location} title={siteTitle} categories={allCategories}>
      <SEO title="All posts" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;

        return (
          <Post key={node.fields.slug}>
            <header>
              <Date date={node.frontmatter.date} />
              <Link to={node.fields.slug}>
                {node.frontmatter.featuredImage && (
                  <>
                    <PostImg
                      fluid={
                        node.frontmatter.featuredImage.childImageSharp.fluid
                      }
                      imgStyle={{ objectFit: 'contain' }}
                    />
                    <MediaDescription
                      description={node.frontmatter.imageDescription}
                    />
                  </>
                )}
                <Title>{title}</Title>
              </Link>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
              <Link to={`${node.fields.slug}#comments`}>
                <CommentsCount
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  shortname={shortname}
                />
              </Link>
            </section>
          </Post>
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
            imageDescription
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
