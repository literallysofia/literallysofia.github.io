import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faBehance } from "@fortawesome/free-brands-svg-icons"

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data
  }

  render() {
    const { frontmatter } = this.data[0].node
    const { title, projects } = frontmatter

    return (
      <section id="portfolio" className="target">
        <h2 className="heading">{title}</h2>
        <Container fluid>
          <Row>
            {projects &&
              projects.map((project, i) => (
                <Col sm={12} md={6} lg={4} key={i}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <h4>{project.title}</h4>
                        <ul className="ml-4">
                          {project.github !== "" && (
                            <li>
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} />
                              </a>
                            </li>
                          )}
                          {project.behance !== "" && (
                            <li>
                              <a href={project.behance} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faBehance} />
                              </a>
                            </li>
                          )}
                        </ul>
                      </Card.Title>
                      <Card.Text>{project.abstract}</Card.Text>
                      <ul className="tags">
                        {project.keywords &&
                          project.keywords.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    )
  }
}

export default Portfolio
