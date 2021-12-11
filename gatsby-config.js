require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Max here.`,
    author: {
      name: `Max`,
      summary: `.`,
    },
    description: `A personal blog about 🗺️ travel, 🎲 board games, 👨‍💻 software development, 🎵 extreme music, and other stuff built with Gatsby React.`,
    siteUrl: `https://maxhere.netlify.app`,
    social: {
      telegram: `zinovik`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    {
      resolve: 'gatsby-plugin-mixpanel',
      options: {
        apiToken: process.env.MIXPANEL_API_TOKEN,
        pageViews: 'all',
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Max here.`,
        short_name: `Max here.`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/logo-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/theme/typographies`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true,
      },
    },
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: [{ regex: '^/' }],
        color: `DarkCyan`,
      },
    },
    `gatsby-plugin-remove-serviceworker`,
  ],
};
