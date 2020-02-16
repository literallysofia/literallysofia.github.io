import React from "react"
import { Link } from "gatsby"
import { navLinks } from "../config"
import logo from "../images/Logo.png"

export default () => (
  <header>
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <div>
        <ul>
          {navLinks &&
            navLinks.map(({ url, name }, i) => (
              <li key={i}>
                <Link to={url}>{name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  </header>
)
