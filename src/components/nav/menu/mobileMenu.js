import React, { useState } from "react"
import styled from "styled-components"
import { useTransition, animated, config } from "react-spring"
import Burger from "../burger/burger"
import DarkModeToggle from "../toggle/toggle"
import Nav from "./nav"

export const StyledMenu = styled(animated.div)`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  top: 0;
  left: 0;

  nav {
    flex-direction: column;
    align-items: center;

    .nav-item {
      margin: 1em 0;
    }
  }

  #toggle-container {
    margin: 1em 0 0 0;
  }
`

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  const transitions = useTransition(open, {
    config: config.stiff,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      {transitions(
        (style, item) =>
          item && (
            <StyledMenu key={item.key} style={style} className="menu">
              <Nav setOpen={setOpen} />
              <DarkModeToggle />
            </StyledMenu>
          )
      )}
    </>
  )
}
