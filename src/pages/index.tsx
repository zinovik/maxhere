import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import BackToTop from '../components/back-to-top';
import TagsList from '../components/tags-list';
import { BlogIndexQuery } from '../../gatsby-graphql';
import { scale } from '../utils/typography';

const H3 = styled.h3`
  margin: 10px;
`;

const Article = styled.article`
  margin-bottom: 40px;
`;

const PostImg = styled(Img)`
  margin: 0px;
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  flex-wrap: wrap;
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
  const tags = data.allMdx.group;

  return (
    <Layout location={location} title={siteTitle}>
      <TagsContainer>
        <TagsList
          tags={tags
            .slice()
            .reverse()
            .sort((t1, t2) => t2.totalCount - t1.totalCount)}
        />
      </TagsContainer>

      <SEO title="All posts" />

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;

        return (
          <Article key={node.fields.slug}>
            <header>
              <Link to={node.fields.slug}>
                {node.frontmatter.featuredImage && (
                  <>
                    <PostImg
                      fluid={
                        node.frontmatter.featuredImage.childImageSharp.fluid
                      }
                      imgStyle={{ objectFit: 'contain' }}
                    />
                    <p
                      style={{
                        ...scale(-1 / 5),
                        color: 'darkgray',
                        margin: '0px',
                      }}
                    >
                      {node.frontmatter.imageDescription}
                    </p>
                  </>
                )}
                <H3>{title}</H3>
              </Link>
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
            imageDescription
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
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
