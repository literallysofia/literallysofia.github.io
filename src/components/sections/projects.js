import React from "react"

class Projects extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    return (
      <section id="projects" className="target">
        <h3 className="heading">
          <span>03.</span>Projects
        </h3>
      </section>
    )
  }
}

export default Projects
