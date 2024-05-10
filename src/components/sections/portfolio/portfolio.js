import React from "react"
import "./portfolio.scss"
import Project from "../../../templates/project"

export default function Portfolio({ data }) {
  const { frontmatter } = data[0].node
  const { title, projects } = frontmatter

  return (
    <section id="portfolio" className="target">
      <h2 className="heading">{title}</h2>
      <div className="portfolio-grid">
        {projects &&
          projects.map((project, i) => <Project key={i} project={project} />)}
      </div>
    </section>
  )
}
