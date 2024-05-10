import React from "react"
import styled from "styled-components"
import DarkModeToggle from "../toggle/toggle"
import Nav from "./nav"
import { bool } from "prop-types"

export const StyledMenu = styled.div`
  display: flex;
  padding-bottom: ${(props) => (props.$scroll ? "0" : "2em")};
  transition: all 0.4s ease-out;

  nav .nav-item {
    margin-left: 3em;
  }

  #toggle-container {
    margin-left: 3em;
  }
`

export default function DesktopMenu({ scroll }) {
  return (
    <StyledMenu className="desktop-menu" $scroll={scroll}>
      <Nav />
      <DarkModeToggle />
    </StyledMenu>
  )
}

DesktopMenu.propTypes = {
  scroll: bool.isRequired
}
