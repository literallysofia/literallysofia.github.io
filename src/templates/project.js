import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faBehance } from "@fortawesome/free-brands-svg-icons"

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(113, 167, 178, 0.2);
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
  const { title, abstract, github, behance, keywords } = project

  return (
    <StyledBox>
      <div className="project-header">
        <h4>{title}</h4>
        <ul className="project-links">
          {github && (
            <li>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          )}
          {behance && (
            <li>
              <a href={behance} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faBehance} />
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
