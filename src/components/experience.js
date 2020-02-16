import React from "react"
import { Link } from "gatsby"
import { Container, Row, Col, Image } from "react-bootstrap"

class Experience extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    return (
      <section>
        <h3 className="heading">
          <span>02.</span>Experience
        </h3>
      </section>
    )
  }
}

export default Experience
