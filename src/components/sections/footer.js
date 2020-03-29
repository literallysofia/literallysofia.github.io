import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedinIn,
  faBehance,
} from "@fortawesome/free-brands-svg-icons"
import { socialMedia } from "../../config"

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.renderSwitch = this.renderSwitch.bind(this)
  }

  renderSwitch(socialName) {
    switch (socialName) {
      case "GitHub":
        return <FontAwesomeIcon icon={faGithub} />
      case "Linkedin":
        return <FontAwesomeIcon icon={faLinkedinIn} />
      case "Behance":
        return <FontAwesomeIcon icon={faBehance} />
      default:
        return null
    }
  }

  render() {
    return (
      <footer>
        <ul className="social-media">
          {socialMedia &&
            socialMedia.map(({ url, name }, i) => (
              <li key={i}>
                <a href={url}>{this.renderSwitch(name)}</a>
              </li>
            ))}
        </ul>
        <span>Built with Gatsby © 2020 Sofia Silva</span>
      </footer>
    )
  }
}

export default Footer
