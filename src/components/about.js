import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import ProfileNormal from "../images/sofia-normal.jpg"
import ProfileHover from "../images/sofia-hover.jpg"

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    return (
      <section>
        <h3>About</h3>
        <Container fluid>
          <Row>
            <Col sm={9}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
                commodo ex, vitae efficitur odio. Proin eget consectetur risus.
                Ut accumsan et dolor quis vulputate. Etiam sagittis turpis non
                convallis pulvinar. Proin porttitor volutpat condimentum. Sed a
                neque metus. Nulla facilisi. Nulla finibus massa eu urna
                euismod, eu mattis eros tincidunt. Donec eleifend nisl aliquam,
                accumsan eros at, cursus libero. Duis commodo enim at tortor
                egestas tempor. Ut rutrum, est nec mattis commodo, libero nunc
                cursus orci, non aliquet ligula turpis ac leo.
              </p>
              <Container fluid>
                <Row>
                  <Col sm>
                    <h4>Education</h4>
                  </Col>
                  <Col sm>
                    <h4>Skills</h4>
                    <div className="d-flex justify-content-between">
                      <ul>
                        <li>JavaScript</li>
                        <li>C/C++/C#</li>
                        <li>Java</li>
                        <li>TypeScript</li>
                        <li>Angular</li>
                        <li>React</li>
                        <li>Vue</li>
                      </ul>
                      <ul>
                        <li>HTML & (S)CSS</li>
                        <li>Node.js</li>
                        <li>PHP</li>
                        <li>Laravel</li>
                        <li>Android</li>
                        <li>Ionic</li>
                        <li>SQLite</li>
                      </ul>
                    </div>
                    <h5>Design Tools</h5>
                    <ul>
                      <li>Figma</li>
                      <li>Sketch</li>
                    </ul>
                  </Col>
                  <Col sm>
                    <h4>Languages</h4>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col sm={3}>
              <Image
                src={this.state.hovered ? ProfileNormal : ProfileHover}
                rounded
                fluid
                alt="Sofia"
                onMouseOut={() => this.setState({ hovered: true })}
                onMouseOver={() => this.setState({ hovered: false })}
              />
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default About
