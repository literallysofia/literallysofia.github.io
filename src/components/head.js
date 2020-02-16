import React from "react"
import Helmet from "react-helmet"
import config from "../config"
//import favicon from '../images/favicons/favicon.ico';

export default () => (
  <Helmet>
    <html lang="en" prefix="og: http://ogp.me/ns#" />
    <title itemProp="name" lang="en">
      {config.siteTitle}
    </title>
    {/* <link rel="shortcut icon" href={favicon} /> */}

    <meta name="description" content={config.description} />
    <meta name="keywords" content={config.siteKeywords} />
    <meta property="og:title" content={config.title} />
    <meta property="og:description" content={config.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={config.siteUrl} />
    <meta property="og:site_name" content={config.title} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:locale" content={config.siteLanguage} />
    <meta itemProp="name" content={config.title} />
    <meta itemProp="description" content={config.description} />

    <meta name="msapplication-TileColor" content={config.navyColor} />
    <meta name="theme-color" content={config.navyColor} />
  </Helmet>
)