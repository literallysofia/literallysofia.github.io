import React from "react"

class Experience extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    return (
      <section id="experience" className="target">
        <h3 className="heading">
          <span>02.</span>Experience
        </h3>
      </section>
    )
  }
}

export default Experience
