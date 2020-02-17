import React from "react"

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    return (
      <section id="contact" className="target">
        <h3 className="heading">
          <span>04.</span>Contact
        </h3>
      </section>
    )
  }
}

export default Contact
