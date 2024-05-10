import React from "react"
import { useTrail, animated, config } from "react-spring"
import scrollTo from "gatsby-plugin-smoothscroll"
import { navLinks } from "../../../config"

export default function Nav({ setOpen }) {
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

  const navigate = (url) => {
    if (setOpen) setOpen(false)
    scrollTo(url)
  }

  return (
    <nav>
      {trail.map((props, index) => (
        <animated.div className="nav-item" key={index} style={props}>
          <button
            eventkey={navLinks[index].name}
            onClick={() => navigate(navLinks[index].url)}
          >
            {navLinks[index].name}
          </button>
        </animated.div>
      ))}
    </nav>
  )
}
