import React from "react"
import "./timeline.scss"

export default function Timeline({ data }) {
  const { frontmatter } = data[0].node
  const { title, jobs } = frontmatter
  const id = title.toLowerCase().split(" ").join("")

  return (
    <section id={id} className="timeline target">
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
              <p className="description">{job.description}</p>
              {job.tasks && (
                <ul>
                  {job.tasks.map((item, j) => {
                    var isSection = Array.from(item)[0] === "#"
                    var text = isSection ? item.substring(2) : item
                    return (
                      <li
                        key={j}
                        className={isSection ? "section" : ""}
                      >
                        {text}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ))}
      </div>
    </section>
  )
}
