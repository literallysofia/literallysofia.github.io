import React from "react"
import { Container, Row, Col, Image } from "react-bootstrap"
import ScrollAnimation from "react-animate-on-scroll"
import Emoji from "react-emoji-render"
import ProfileNormal from "../../images/sofia-normal.jpg"
import ProfileHover from "../../images/sofia-hover.jpg"

class About extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data
    this.state = { hovered: false }
  }

  render() {
    const { frontmatter, html } = this.data[0].node
    const { title, education, languages, skills, tools } = frontmatter
    const dividedSkills = {
      left: skills.slice(0, Math.ceil(skills.length / 2)),
      right: skills.slice(Math.ceil(skills.length / 2), skills.length),
    }

    return (
      <section id="about" className="target">
        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <h2 className="heading">{title}</h2>
          <Container fluid>
            <Row>
              <Col sm={12} md={9}>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: html }}
                ></div>
                <Container fluid>
                  <Row>
                    <Col md={12} lg={5}>
                      <h3>Education</h3>
                      {education &&
                        education.map((item, i) => (
                          <div className="education" key={i}>
                            <span>{item.date}</span>
                            <h5>{item.degree}</h5>
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
                              <h5>{item.language}</h5>
                            </div>
                            <p>{item.level}</p>
                          </div>
                        ))}
                    </Col>
                    <Col md={12} lg={4}>
                      <h4>Skills</h4>
                      <h5>Technologies</h5>
                      <div className="d-flex">
                        <ul>
                          {skills &&
                            dividedSkills.left.map((skill, i) => (
                              <li key={i}>{skill}</li>
                            ))}
                        </ul>
                        <ul>
                          {skills &&
                            dividedSkills.right.map((skill, i) => (
                              <li key={i}>{skill}</li>
                            ))}
                        </ul>
                      </div>
                      <h5>Design Tools</h5>
                      <ul>
                        {tools &&
                          tools.map((tool, i) => <li key={i}>{tool}</li>)}
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
