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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Playfair Display`,
            variants: [`700`, `900`],
          },
          {
            family: `Poppins`,
            variants: [`400`, `400i`, `600`, `700`, `700i`],
          },
          {
            family: `Raleway`,
            variants: [`400`, `700`],
          },
        ],
      },
    },
  ],
}
