import React from "react"
import styled from "styled-components"
import DarkModeToggle from "../toggle/toggle"
import Nav from "./nav"

export const StyledMenu = styled.div`
  display: flex;
  padding-bottom: ${({ scroll }) => (scroll ? "0" : "2em")};

  nav {
    .nav-item {
      margin-left: 3em;
    }
  }

  #toggle-container {
    margin-left: 3em;
  }
`

const DesktopMenu = ({ scroll }) => {
  return (
    <StyledMenu scroll={scroll}>
      <Nav />
      <DarkModeToggle />
    </StyledMenu>
  )
}

export default DesktopMenu
