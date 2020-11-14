import React, { useState, useEffect } from "react"
import "./header.scss"
import styled from "styled-components"
import DesktopMenu from "../nav/menu/desktopMenu"
import MobileMenu from "../nav/menu/mobileMenu"

export const StyledBrand = styled.span`
  font-size: ${({ scroll }) => (scroll ? "3em" : "6em")};
`

const Header = ({isNotFound}) => {
  const [mobile, setMobile] = useState(null)
  const [scroll, setScroll] = useState(false)

  const setDevice = () => {
    if (window.matchMedia("(max-width: 55em)").matches) setMobile(true)
    else setMobile(false)
  }

  const setHeader = () => {
    if (document.documentElement.scrollTop > 0) setScroll(true)
    else setScroll(false)
  }

  useEffect(() => {
    setDevice()
    window.addEventListener("resize", setDevice)

    setHeader()
    window.addEventListener("scroll", setHeader)
  })

  return (
    <header scroll={scroll.toString()}>
      <StyledBrand className={"navbar-brand"} scroll={scroll}>
        S
      </StyledBrand>
      {isNotFound ? null : mobile ? <MobileMenu /> : <DesktopMenu scroll={scroll} />}
    </header>
  )
}

export default Header
