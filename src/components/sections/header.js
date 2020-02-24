import React from "react"
import { Link } from "gatsby"
import { Navbar, Nav, Button } from "react-bootstrap"
import { navLinks } from "../../config"
import BurgerSqueeze from "@animated-burgers/burger-squeeze"
import scrollTo from "gatsby-plugin-smoothscroll"
import logo from "../../images/logo.svg"

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
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle>
          <BurgerSqueeze isOpen={this.state.isActive} />
        </Navbar.Toggle>

        <Navbar.Collapse>
          <Nav
            className="ml-auto"
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
            <Button variant="secondary" href="mailto: sofialcfsilva@gmail.com">
              Contact
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
