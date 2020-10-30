import React from "react"
import "./header.scss"
import { Navbar, Nav } from "react-bootstrap"
import { navLinks } from "../../config"
import BurgerSqueeze from "@animated-burgers/burger-squeeze"
import scrollTo from "gatsby-plugin-smoothscroll"
import DarkModeToggle from "../toggle/toggle"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isActive: false, scrolled: false }
    this.handleClick = this.handleClick.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleClick = () => {
    this.setState(state => ({ isActive: !state.isActive }))
  }

  handleScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }

  componentDidMount() {
    window.onscroll = () => this.handleScroll()
  }

  render() {
    return (
      <Navbar
        fixed="top"
        expand="lg"
        onToggle={this.handleClick}
        expanded={this.state.isActive}
        className={this.state.scrolled ? "scroll" : ""}
      >
        <Navbar.Brand className={this.state.scrolled ? "scroll" : ""}>
          S
        </Navbar.Brand>

        <Navbar.Toggle>
          <BurgerSqueeze isOpen={this.state.isActive} />
        </Navbar.Toggle>

        <Navbar.Collapse>
          <Nav
            className={this.state.scrolled ? "ml-auto scroll" : "ml-auto"}
            onSelect={this.state.isActive ? this.handleClick : null}
          >
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <Nav.Item key={i}>
                  <Nav.Link eventKey={name} onClick={() => scrollTo(url)}>
                    {name}
                  </Nav.Link>
                </Nav.Item>
              ))}
          </Nav>
          <DarkModeToggle />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
