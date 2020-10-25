import React from "react"
import { Card } from "react-bootstrap"
import ScrollAnimation from "react-animate-on-scroll"

class ExtraCurricular extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.data
  }

  render() {
    const { frontmatter } = this.data[0].node
    const { title, jobs } = frontmatter

    return (
      <section id="extracurricular" className="target">
        <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
          <h2 className="heading">{title}</h2>
          <div className="card-list">
            {jobs &&
              jobs.map((job, i) => (
                <div className="card-item" key={i}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {job.title}
                        <a href={job.web}>{job.company}</a>
                      </Card.Title>
                      <span>{job.date}</span>
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

export default ExtraCurricular
