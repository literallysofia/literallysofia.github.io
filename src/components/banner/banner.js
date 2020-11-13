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

  const socialMediaIcon = socialName => {
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
    <div className="banner d-flex flex-column">
      <div fluid className="banner-inner">
        <div>
          <div>
            <img src={Portrait} fluid alt="Sofia" />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-start content">
            <span>{subtitle}</span>
            <h1>{title}</h1>
            <p>{slogan}</p>
            <button href="mailto:sofialcfsilva@gmail.com">Say hello</button>
          </div>
        </div>
      </div>
      <ul className="social-media ml-auto">
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <li key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {socialMediaIcon(name)}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Banner
