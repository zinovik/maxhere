import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from 'gatsby-image';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TagsList from '../components/tags-list';
import BackToTop from '../components/back-to-top';
import Date from '../components/date';
import { Comments, CommentsCount } from '../components/disqus';

import { rhythm, scale } from '../utils/typography';
import { BlogPostTemplateQuery } from '../../gatsby-graphql';

interface Context {
  frontmatter: {
    title: string;
    tags: string[];
  };
  fields: {
    slug: string;
  };
}

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
  if (!data.mdx?.frontmatter || !data.mdx?.fields?.slug || !data.mdx?.body) {
    return null;
  }

  const siteTitle = data.site?.siteMetadata?.title ?? '';
  const tags = data.allMdx.group;

  const { frontmatter, fields, body } = data.mdx;
  const { previous, next } = pageContext;

  const shortname = process.env.GATSBY_DISQUS_NAME || 'maxhere';
  const slug = data.mdx.fields.slug;
  const title = frontmatter.title;

  const Tags = () => (
    <p>
      tags: <TagsList tags={frontmatter.tags} />
    </p>
  );

  return (
    <Layout location={location} title={siteTitle} tags={tags}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || data.mdx.excerpt}
        image={frontmatter?.featuredImage?.childImageSharp?.fluid?.src}
      />
      <article>
        <header>
          <Date date={frontmatter.date} />
          {frontmatter.featuredImage && (
            <>
              <Img
                fluid={frontmatter?.featuredImage?.childImageSharp?.fluid}
                imgStyle={{ objectFit: 'contain' }}
              />
              <p
                style={{
                  ...scale(-1 / 5),
                  color: 'darkgray',
                }}
              >
                {frontmatter.imageDescription}
              </p>
            </>
          )}
          <h1
            style={{
              marginTop: rhythm(1),
            }}
          >
            {frontmatter.title}
          </h1>
          <p>{frontmatter.description}</p>
          <Tags />
          <a href="#comments">
            ⬇️ <CommentsCount slug={slug} title={title} shortname={shortname} />
          </a>
        </header>
        <hr />
        <MDXRenderer>{body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Tags />
          <Bio />
          <a name="comments"></a>
          <Comments slug={slug} title={title} shortname={shortname} />
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
