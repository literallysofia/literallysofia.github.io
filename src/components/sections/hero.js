import React from "react"
import { Button, Container, Row, Col, Image } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { socialMedia } from "../../config"
import Portrait from "../../images/test.png"
import {
  faGithub,
  faLinkedinIn,
  faBehance,
} from "@fortawesome/free-brands-svg-icons"

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
    const { frontmatter } = this.data[0].node
    const { title, subtitle, slogan } = frontmatter

    return (
      <div className="hero d-flex flex-column">
        <Container fluid className="hero-inner">
          <Row>
            <Col sm={12} md={5}>
              <Image src={Portrait} fluid alt="Sofia" />
            </Col>
            <Col
              sm={12}
              md={7}
              className="d-flex flex-column justify-content-center align-items-start content"
            >
              <span>{subtitle}</span>
              <h1>{title}</h1>
              <p>{slogan}</p>
              <Button variant="primary" href="mailto:sofialcfsilva@gmail.com">
                Say hello
              </Button>
            </Col>
          </Row>
        </Container>
        <ul className="social-media ml-auto">
          {socialMedia &&
            socialMedia.map(({ url, name }, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer">{this.renderSwitch(name)}</a>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

export default Hero
