import React from "react"
import { Card } from "react-bootstrap"
import ScrollAnimation from "react-animate-on-scroll"

class Experience extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data
  }

  render() {
    const { frontmatter } = this.data[0].node
    const { title, jobs } = frontmatter

    return (
      <section id="experience" className="target">
        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <h3 className="heading">
            <span>02.</span>
            {title}
          </h3>
          <div className="card-list">
            {jobs &&
              jobs.map((job, i) => (
                <div className="card-item" key={i}>
                  <Card>
                    <Card.Header>{job.date}</Card.Header>
                    <Card.Body>
                      <Card.Title>
                        {job.title}
                        <a href={job.web}>{job.company}</a>
                      </Card.Title>
                      <ul>
                        {job.bio &&
                          job.bio.map((item, j) => <li key={j}>{item}</li>)}
                      </ul>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        </ScrollAnimation>
      </section>
    )
  }
}

export default Experience
