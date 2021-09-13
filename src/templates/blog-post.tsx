import React, { useState, createContext } from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Img from 'gatsby-image';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LinksList from '../components/links-list';
import BackToTop from '../components/back-to-top';
import Date from '../components/date';
import { Comments, CommentsCount } from '../components/disqus';
// import ParallaxImage from '../components/parallax-image';
import ImageDescription from '../components/image-description';

import { rhythm } from '../utils/typography';
import { BlogPostTemplateQuery } from '../../gatsby-graphql';

import bgg from '../../content/bgg.json';
import { BggGames } from '../types/BggGames';

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

export const BggGamesContext = createContext({
  bggGames: bgg as BggGames,
  setBggGames: (bgg: BggGames) => null,
});

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data,
  pageContext,
  location,
}) => {
  if (!data.mdx?.frontmatter || !data.mdx?.fields?.slug || !data.mdx?.body) {
    return null;
  }

  const [bggGames, setBggGames] = useState(bgg);

  const siteTitle = data.site?.siteMetadata?.title ?? '';
  const allCategories = data.allMdx.group;

  const { frontmatter, body } = data.mdx;
  const { previous, next } = pageContext;

  const shortname = process.env.GATSBY_DISQUS_NAME || 'maxhere';
  const slug = data.mdx.fields.slug;
  const title = frontmatter.title;

  const Tags = () => (
    <>
      tags: <LinksList links={frontmatter.tags} areTags />
    </>
  );

  return (
    <BggGamesContext.Provider value={{ bggGames, setBggGames }}>
      <Layout location={location} title={siteTitle} categories={allCategories}>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description || data.mdx.excerpt}
          image={frontmatter?.featuredImage?.childImageSharp?.fluid?.src}
        />
        <article>
          <header>
            <Date date={frontmatter.date} />
            {/* <ParallaxImage
            imageSrc={frontmatter?.featuredImage?.childImageSharp?.fluid?.src}
          /> */}
            <Img fluid={frontmatter?.featuredImage?.childImageSharp?.fluid} />
            <ImageDescription description={frontmatter.imageDescription} />
            <h1
              style={{
                marginTop: rhythm(1),
              }}
            >
              {frontmatter.title}
            </h1>
            <p>{frontmatter.description}</p>
            <Tags /> |{' '}
            <a href="#comments">
              ⬇️{' '}
              <CommentsCount slug={slug} title={title} shortname={shortname} />
            </a>
          </header>

          <br />
          <hr />
          <MDXRenderer>{body}</MDXRenderer>
          <hr />

          <footer>
            <Bio />
            <a className="anchor" id="comments"></a>
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
    </BggGamesContext.Provider>
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
        categories
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
    }
    allMdx {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
