import React from "react"
import { Jumbotron, Button } from "react-bootstrap"
import ScrollAnimation from "react-animate-on-scroll"
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
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <h1>Hello, my name is</h1>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={500} animateOnce={true}>
            <h2>Sofia Silva.</h2>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={1000} animateOnce={true}>
            <ul className="social-media">
              {socialMedia &&
                socialMedia.map(({ url, name }, i) => (
                  <li key={i}>
                    <a href={url}>{this.renderSwitch(name)}</a>
                  </li>
                ))}
            </ul>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={1500} animateOnce={true}>
            <p>
              I'm a woman in engineering who is enthusiastic about UX/UI design,
              interactive systems, and keen on web/mobile development. I love to
              be involved in projects that allow me to share my passion and
              contribute to a greater good.
            </p>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={2000} animateOnce={true}>
            <a href={File} target="_blank" rel="nofollow noopener noreferrer">
              <Button variant="primary">Resume</Button>
            </a>
          </ScrollAnimation>
        </div>
      </Jumbotron>
    )
  }
}

export default Hero
