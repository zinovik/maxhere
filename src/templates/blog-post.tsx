import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from 'gatsby-image';
import { DiscussionEmbed } from 'disqus-react';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TagsList from '../components/tags-list';
import BackToTop from '../components/back-to-top';
import { rhythm, scale } from '../utils/typography';
import { BlogPostTemplateQuery } from '../../gatsby-graphql';

type Context = {
  frontmatter: {
    title: string;
  };
  fields: {
    slug: string;
  };
};

interface BlogPostTemplateProps {
  data: BlogPostTemplateQuery;
  pageContext: {
    previous: Context;
    next: Context;
  };
  location: {
    pathname: string;
  };
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data,
  pageContext,
  location,
}) => {
  const siteTitle = data?.site?.siteMetadata?.title ?? '';
  const post = data.mdx;
  const { previous, next } = pageContext;

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME || 'maxhere',
    config: {
      identifier: post.fields.slug.replace(/\/$/, ''),
      title: post.frontmatter.title,
      disqus_identifier: post.fields.slug.replace(/\/$/, ''),
    },
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={post.frontmatter.featuredImage.childImageSharp.fluid.src}
      />
      <article>
        <header>
          {post.frontmatter.featuredImage && (
            <>
              <Img
                fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
                imgStyle={{ objectFit: 'contain' }}
              />
              <p
                style={{
                  ...scale(-1 / 5),
                  color: "darkgray",
                }}
              >
                {post.frontmatter.imageDescription}
              </p>
            </>
          )}
          <h1
            style={{
              marginTop: rhythm(1),
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <p>{post.frontmatter?.description}</p>
          <TagsList tags={post.frontmatter.tags} />
        </header>
        <hr />
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <TagsList tags={post?.frontmatter?.tags || []} />
          <Bio />
          <DiscussionEmbed {...disqusConfig} />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <BackToTop />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostTemplate($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        imageDescription
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`;
