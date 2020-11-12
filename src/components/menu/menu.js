import React from "react"
import styled from "styled-components"
import { useTrail, animated, config } from "react-spring"
import scrollTo from "gatsby-plugin-smoothscroll"
import { navLinks } from "../../config"
import DarkModeToggle from "../toggle/toggle"

export const StyledMenu = styled.nav`
  /* transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")}; */
`

const Menu = ({ open, scroll }) => {
  const trail = useTrail(navLinks.length, {
    config: config.wobbly,
    delay: 200,
    opacity: 1,
    transform: "translateY(0px)",
    from: {
      opacity: 0,
      transform: "translateY(10px)",
    },
  })

  return (
    <StyledMenu className={"navbar-collapse collapse " + scroll} open={open}>
      <nav className="navbar-nav">
        {trail.map((props, index) => (
          <animated.div key={index} style={props}>
            <a
              className="nav-item"
              href="#"
              eventkey={navLinks[index].name}
              onClick={() => scrollTo(navLinks[index].url)}
            >
              {navLinks[index].name}
            </a>
          </animated.div>
        ))}
      </nav>
      <DarkModeToggle />
    </StyledMenu>
  )
}

export default Menu
