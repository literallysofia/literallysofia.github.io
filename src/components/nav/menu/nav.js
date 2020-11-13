import React from "react"
import { useTrail, animated, config } from "react-spring"
import scrollTo from "gatsby-plugin-smoothscroll"
import { navLinks } from "../../../config"

const Nav = () => {
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
    <nav>
      {trail.map((props, index) => (
        <animated.div className="nav-item" key={index} style={props}>
          <a
            href="/#"
            eventkey={navLinks[index].name}
            onClick={() => scrollTo(navLinks[index].url)}
          >
            {navLinks[index].name}
          </a>
        </animated.div>
      ))}
    </nav>
  )
}

export default Nav
