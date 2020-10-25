import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import Emoji from "react-emoji-render"
import PhotoOne from "../../images/about-1.jpg"
import PhotoTwo from "../../images/about-2.jpg"

class About extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data
    this.state = { hovered: false }
  }

  render() {
    const { frontmatter, html } = this.data[0].node
    const { title, education, languages } = frontmatter

    return (
      <section id="about" className="target">
        <h2 className="heading">{title}</h2>
        <Container fluid>
          <Row>
            <Col sm={12} md={7}>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
              <Container fluid>
                <Row>
                  <Col md={12} lg={9}>
                    <h3>Education</h3>
                    {education &&
                      education.map((item, i) => (
                        <div className="education" key={i}>
                          <span>{item.date}</span>
                          <h4>{item.degree}</h4>
                          <p>{item.details}</p>
                          <a href={item.web}>{item.school}</a>
                        </div>
                      ))}
                  </Col>
                  <Col md={12} lg={3}>
                    <h3>Languages</h3>
                    {languages &&
                      languages.map((item, i) => (
                        <div className="language" key={i}>
                          <div className="d-flex">
                            <Emoji text={item.icon} />
                            <h4>{item.language}</h4>
                          </div>
                          <p>{item.level}</p>
                        </div>
                      ))}
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col sm={12} md={5}>
              <Container fluid className="gallery">
                <Row>
                  <Col md={12} lg={5}>
                    <Image src={PhotoOne} fluid alt="Sofia" />
                  </Col>
                  <Col md={12} lg={7}>
                    <Image src={PhotoTwo} fluid alt="Sofia" />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default About
