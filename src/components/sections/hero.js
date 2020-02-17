import React from "react"
import { Jumbotron, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedinIn,
  faBehance,
} from "@fortawesome/free-brands-svg-icons"
import { socialMedia } from "../../config"
import File from "../../../static/cv.pdf"

class Hero extends React.Component {
  constructor(props) {
    super(props)
    this.renderSwitch = this.renderSwitch.bind(this)
  }

  renderSwitch(socialName) {
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

  render() {
    return (
      <Jumbotron fluid className="hero">
        <div className="hero-inner">
          <h1>Hello, my name is</h1>
          <h2>Sofia Silva.</h2>
          <ul className="social-media">
            {socialMedia &&
              socialMedia.map(({ url, name }, i) => (
                <li key={i}>
                  <a href={url}>{this.renderSwitch(name)}</a>
                </li>
              ))}
          </ul>
          <p>
            I'm a woman in engineering who is enthusiastic about UX/UI design,
            interactive systems, and keen on web/mobile development. I love to
            be involved in projects that allow me to share my passion and
            contribute to a greater good.
          </p>
          <a href={File} target="_blank" rel="nofollow noopener noreferrer">
            <Button variant="primary">Resume</Button>
          </a>
        </div>
      </Jumbotron>
    )
  }
}

export default Hero
