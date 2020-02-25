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
    this.data = props.data
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
    const { frontmatter, html } = this.data[0].node
    const { title, subtitle } = frontmatter

    return (
      <Jumbotron fluid className="hero">
        <div className="hero-inner">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <h1>{subtitle}</h1>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={500} animateOnce={true}>
            <h2>{title}</h2>
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
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={2000} animateOnce={true} offset={50}>
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
