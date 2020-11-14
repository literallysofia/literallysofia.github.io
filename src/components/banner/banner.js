import React from "react"
import "./banner.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { socialMedia } from "../../config"
import Portrait from "../../images/test.png"
import {
  faGithub,
  faLinkedinIn,
  faBehance,
} from "@fortawesome/free-brands-svg-icons"

const Banner = ({ data }) => {
  const { frontmatter } = data[0].node
  const { title, subtitle, slogan } = frontmatter

  const socialIcon = socialName => {
    switch (socialName) {
      case "GitHub":
        return <FontAwesomeIcon icon={faGithub} />
      case "Linkedin":
        return <FontAwesomeIcon icon={faLinkedinIn} />
      case "Behance":
        return <FontAwesomeIcon icon={faBehance} />
      default:
        return null
    }
  }

  return (
    <div id="banner">
      <div className="banner-content">
        <div className="image-wrapper">
          <img src={Portrait} alt="Portrait" />
        </div>
        <div className="banner-intro">
          <span>{subtitle}</span>
          <h1>{title}</h1>
          <p>{slogan}</p>
          <button className="default" href="mailto:sofialcfsilva@gmail.com">Say hello</button>
        </div>
      </div>
      <ul className="social-media">
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <li key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {socialIcon(name)}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Banner
