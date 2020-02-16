import React from "react"
import { Jumbotron, Button } from "react-bootstrap"
import File from "../../static/cv.pdf"

export default () => (
  <Jumbotron fluid className="hero">
    <div className="hero-inner">
      <h1>Hello, my name is</h1>
      <h2>Sofia Silva.</h2>
      <p>
        I'm a woman in engineering who is enthusiastic about UX/UI design,
        interactive systems, and keen on web/mobile development. I love to be
        involved in projects that allow me to share my passion and contribute to
        a greater good.
      </p>
      <a href={File} target="_blank" rel="nofollow noopener noreferrer">
        <Button variant="primary">Resume</Button>
      </a>
    </div>
    
  </Jumbotron>
)
