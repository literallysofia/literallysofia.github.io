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
    `gatsby-plugin-use-dark-mode`,
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
