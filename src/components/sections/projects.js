import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faBehance } from "@fortawesome/free-brands-svg-icons"

class Projects extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section id="projects" className="target">
        <h3 className="heading">
          <span>03.</span>Projects
        </h3>
        <Container fluid>
          <Row>
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Header>
                  <a href="">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Card.Header>
                <Card.Body>
                  <Card.Title as="h4">Aurora</Card.Title>
                  <Card.Text>
                    A hack and slash game developed for the Computer Games
                    Development (DJCO) class of the Master in Informatics and
                    Computer Engineering (MIEIC) at the Faculty of Engineering
                    of the University of Porto (FEUP).
                  </Card.Text>
                  <ul className="tags">
                    <li>Tech</li>
                    <li>Tech</li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>
                  <a href="">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Card.Header>
                <Card.Body>
                  <Card.Title as="h4">Aurora</Card.Title>
                  <Card.Text>
                    A hack and slash game developed for the Computer Games
                    Development (DJCO) class of the Master in Informatics and
                    Computer Engineering (MIEIC) at the Faculty of Engineering
                    of the University of Porto (FEUP).
                  </Card.Text>
                  <ul className="tags">
                    <li>Tech</li>
                    <li>Tech</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Header>
                  <a href="">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Card.Header>
                <Card.Body>
                  <Card.Title as="h4">Aurora</Card.Title>
                  <Card.Text>
                    A hack and slash game developed for the Computer Games
                    Development (DJCO) class of the Master in Informatics and
                    Computer Engineering (MIEIC) at the Faculty of Engineering
                    of the University of Porto (FEUP).
                  </Card.Text>
                  <ul className="tags">
                    <li>Tech</li>
                    <li>Tech</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Header>
                  <a href="">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Card.Header>
                <Card.Body>
                  <Card.Title as="h4">Aurora</Card.Title>
                  <Card.Text>
                    A hack and slash game developed for the Computer Games
                    Development (DJCO) class of the Master in Informatics and
                    Computer Engineering (MIEIC) at the Faculty of Engineering
                    of the University of Porto (FEUP).
                  </Card.Text>
                  <ul className="tags">
                    <li>Tech</li>
                    <li>Tech</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Projects
