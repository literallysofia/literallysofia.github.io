import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faBehance } from "@fortawesome/free-brands-svg-icons"

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 2.5em 1em 2.5em;

  h4 {
    margin: 0;
  }

  p {
    font-size: 1em;
  }

  .project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      transition: all 0.4s ease-out;
      &:before {
        content: "";
      }
      &:hover {
        transform: translateY(-3px);
      }
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }

  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    line-height: 1.2em;
  }

  ul.project-links, ul.project-links li {
    margin: 0;
    font-size: 1.15em;
  }

  ul.project-tags {
    margin-top: auto;
  }

  ul.project-tags li {
      font-size: 0.9em;
      &::before {
        content: "";
        margin: 0;
      }
      &:not(:last-child) {
        margin-right: 1em;
      }
    }
  }
`

const Project = ({ project }) => {
  const { title, abstract, github, behance, website, keywords } = project

  return (
    <StyledBox>
      <div className="project-header">
        <h4>{title}</h4>
        <ul className="project-links">
          {github && (
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub link">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          )}
          {behance && (
            <li>
              <a href={behance} target="_blank" rel="noopener noreferrer" aria-label="Behance link">
                <FontAwesomeIcon icon={faBehance} />
              </a>
            </li>
          )}
          {website && (
            <li>
              <a href={website} target="_blank" rel="noopener noreferrer" aria-label="Website link">
                <FontAwesomeIcon icon={faLink} />
              </a>
            </li>
          )}
        </ul>
      </div>
      <p>{abstract}</p>
      <ul className="project-tags">
        {keywords && keywords.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </StyledBox>
  )
}

export default Project
