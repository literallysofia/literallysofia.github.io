import React, { useState, useEffect } from "react"
import "./header.scss"
import styled from "styled-components"
import DesktopMenu from "../nav/menu/desktopMenu"
import MobileMenu from "../nav/menu/mobileMenu"

export const StyledBrand = styled.span`
  font-size: ${({ scroll }) => (scroll ? "3em" : "6em")};
`

const Header = () => {
  const [mobile, setMobile] = useState(null)
  const [scroll, setScroll] = useState(false)

  const setDevice = () => {
    window.matchMedia("(max-width: 55em)").matches
      ? setMobile(true)
      : setMobile(false)
  }

  useEffect(() => {
    setDevice()
    window.addEventListener("resize", setDevice)

    window.onscroll = () => {
      if (document.documentElement.scrollTop > 0) setScroll(true)
      else setScroll(false)
    }
  })

  return (
    <header scroll={scroll.toString()}>
      <StyledBrand className={"navbar-brand"} scroll={scroll}>
        S
      </StyledBrand>
      {mobile ? <MobileMenu /> : <DesktopMenu scroll={scroll} />}
    </header>
  )
}

export default Header
