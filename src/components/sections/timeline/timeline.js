import React from "react"
import "./timeline.scss"

const Timeline = ({ data }) => {
  const { frontmatter } = data[0].node
  const { title, jobs } = frontmatter

  return (
    <section className="timeline target">
      <h2 className="heading">{title}</h2>
      <div className="card-list">
        {jobs &&
          jobs.map((job, i) => (
            <div className="card-item" key={i}>
              <div className="card-header">
                {job.title}
                {job.company && (
                  <a href={job.web} target="_blank" rel="noopener noreferrer">
                    {job.company}
                  </a>
                )}
              </div>
              <span>{job.date}</span>
              <ul>
                {job.bio && job.bio.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Timeline
