import React from "react"
import "./about.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PhotoOne from "../../../images/gallery-1.jpg"
import PhotoTwo from "../../../images/gallery-2.jpg"
import { faFile } from "@fortawesome/free-solid-svg-icons"

export default function About({ data }) {
  const { frontmatter, html } = data[0].node
  const { title, education, languages } = frontmatter

  return (
    <section id="about" className="target">
      <h2 className="heading">{title}</h2>
      <div className="about-content">
        <div className="about-details">
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
          <div className="about-grid">
            <div>
              <h3>Education</h3>
              {education &&
                education.map((item, i) => (
                  <div className="education" key={i}>
                    <span>{item.date}</span>
                    <h4>{item.degree}</h4>
                    <p>
                      {item.details}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ref"
                          aria-label="File"
                        >
                          <FontAwesomeIcon icon={faFile} />
                        </a>
                      )}
                    </p>
                    <a
                      href={item.web}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.school}
                    </a>
                  </div>
                ))}
            </div>
            <div>
              <h3>Languages</h3>
              {languages &&
                languages.map((item, i) => (
                  <div className="language" key={i}>
                    <div className="language-heading">
                      <span>{item.icon}</span>
                      <h4>{item.language}</h4>
                    </div>
                    <p>{item.level}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="about-gallery">
          <div className="image">
            <img src={PhotoOne} alt="Poland" />
          </div>
          <div className="image">
            <img src={PhotoTwo} alt="Madrid" />
          </div>
        </div>
      </div>
    </section>
  )
}
