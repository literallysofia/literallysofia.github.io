import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import ScrollAnimation from "react-animate-on-scroll"
import ProfileNormal from "../../images/sofia-normal.jpg"
import ProfileHover from "../../images/sofia-hover.jpg"

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    return (
      <section id="about" className="target">
        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <h3 className="heading">
            <span>01.</span>About
          </h3>

          <Container fluid>
            <Row>
              <Col sm={12} md={9}>
                <p className="mb-4">
                  Hello! I'm Sofia, a software engineer based in Porto,
                  Portugal. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Sed ut commodo ex, vitae efficitur odio. Proin eget
                  consectetur risus. Ut accumsan et dolor quis vulputate. Etiam
                  sagittis turpis non convallis pulvinar. Proin porttitor
                  volutpat condimentum.
                </p>
                <Container fluid>
                  <Row>
                    <Col md={12} lg={5}>
                      <h4>Education</h4>
                      <div className="education">
                        <span>Sep 2015 - Present</span>
                        <h5>
                          Integrated Master’s in Informatics and Computing
                          Engineering
                        </h5>
                        <a href="https://sigarra.up.pt/feup/pt">
                          @ Faculdade de Engenharia da Universidade do Porto
                        </a>
                      </div>
                      <div className="education">
                        <span>Sep 2019 - Jan 2020</span>
                        <h5>Programme Erasmus+ Studies</h5>
                        <a href="https://www.fi.upm.es">
                          @ Universidad Politécnica de Madrid
                        </a>
                      </div>
                    </Col>
                    <Col md={12} lg={3}>
                      <h4>Languages</h4>
                      <div className="language">
                        <div className="d-flex">
                          <span role="img" aria-label="emoji portugal flag">
                            🇵🇹
                          </span>
                          <h5>Portuguese</h5>
                        </div>
                        <p>Native</p>
                      </div>
                      <div className="language">
                        <div className="d-flex">
                          <span role="img" aria-label="emoji uk flag">
                            🇬🇧
                          </span>
                          <h5>English</h5>
                        </div>
                        <p>Fluent</p>
                      </div>
                      <div className="language">
                        <div className="d-flex">
                          <span role="img" aria-label="emoji spain flag">
                            🇪🇸
                          </span>
                          <h5>Spanish</h5>
                        </div>
                        <p>Intermediate</p>
                      </div>
                    </Col>
                    <Col md={12} lg={4}>
                      <h4>Skills</h4>
                      <h5>Technologies</h5>
                      <div className="d-flex">
                        <ul>
                          <li>JavaScript</li>
                          <li>TypeScript</li>
                          <li>C/C++/C#</li>
                          <li>Java</li>
                          <li>Node.js</li>
                        </ul>
                        <ul>
                          <li>HTML & (S)CSS</li>
                          <li>Angular</li>
                          <li>React</li>
                          <li>Vue</li>
                          <li>Android</li>
                        </ul>
                      </div>
                      <h5>Design Tools</h5>
                      <ul>
                        <li>Figma</li>
                        <li>Sketch</li>
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col sm={12} md={3}>
                <Image
                  src={this.state.hovered ? ProfileHover : ProfileNormal}
                  rounded
                  fluid
                  alt="Sofia"
                  onMouseOut={() => this.setState({ hovered: false })}
                  onBlur={() => this.setState({ hovered: false })}
                  onMouseOver={() => this.setState({ hovered: true })}
                  onFocus={() => this.setState({ hovered: true })}
                />
              </Col>
            </Row>
          </Container>
        </ScrollAnimation>
      </section>
    )
  }
}

export default About
