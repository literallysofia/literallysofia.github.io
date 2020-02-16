import React from "react"
import { Link } from "gatsby"
import { Navbar, Nav, Button } from "react-bootstrap"
import { navLinks } from "../config"
import logo from "../images/Logo.png"
import BurgerSqueeze from "@animated-burgers/burger-squeeze"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    this.setState(state => ({ isActive: !state.isActive }))
  }

  render() {
    return (
      <Navbar fixed="top" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <BurgerSqueeze
            isOpen={this.state.isActive}
            onClick={this.handleClick}
          />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link to={url}>{name}</Link>
                </li>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
