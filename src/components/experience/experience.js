import React from "react"
import "./experience.scss"
import { Card } from "react-bootstrap"

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
        <h2 className="heading">{title}</h2>
        <div className="card-list">
          {jobs &&
            jobs.map((job, i) => (
              <div className="card-item" key={i}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {job.title}
                      {job.company && (
                        <a href={job.web} target="_blank" rel="noopener noreferrer">
                          {job.company}
                        </a>
                      )}
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
      </section>
    )
  }
}

export default Experience
