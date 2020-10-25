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
                        <div className="ml-4">
                          {project.github !== "" && (
                            <a href={project.github}>
                              <FontAwesomeIcon icon={faGithub} />
                            </a>
                          )}
                          {project.behance !== "" && (
                            <a href={project.behance}>
                              <FontAwesomeIcon icon={faBehance} />
                            </a>
                          )}
                        </div>
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
