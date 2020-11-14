const config = require("./src/config")

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    siteUrl: config.siteUrl,
    description: config.siteDescription,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-use-dark-mode`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sofia Silva | Software Engineer`,
        short_name: `Sofia Silva`,
        start_url: `/`,
        icon: `src/images/icon.png`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `playfair display\:700,900`,
          `poppins\:400,400i,600,700,700i`,
          `raleway\:400,700`,
        ],
        display: 'swap'
      }
    }
  ],
}
