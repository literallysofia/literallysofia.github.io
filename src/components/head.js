import React from "react"
import Helmet from "react-helmet"
import config from "../config"

export default function Head() {
  return (
    <Helmet>
      <html lang="en" prefix="og: http://ogp.me/ns#" />
      <title itemProp="name" lang="en">
        {config.siteTitle}
      </title>

      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.siteKeywords} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.siteUrl} />
      <meta property="og:site_name" content={config.title} />
      <meta property="og:locale" content={config.siteLanguage} />
      <meta itemProp="name" content={config.title} />
      <meta itemProp="description" content={config.description} />

      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}
